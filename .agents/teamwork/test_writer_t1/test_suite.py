#!/usr/bin/env python3
"""
test_suite.py - Comprehensive Unit & Integration Tests for check_links.py and check_tags.py
Verifies link resolution, code block stripping, heading matching, frontmatter parsing,
and hierarchical tag validation against edge cases and adversarial scenarios.
"""

import sys
import os
import shutil
import tempfile
import unittest
from pathlib import Path

# Add project root to sys.path to import check_links and check_tags
ROOT_DIR = Path(__file__).resolve().parent.parent.parent.parent
sys.path.insert(0, str(ROOT_DIR))

import check_links
import check_tags

class TestCheckLinks(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.mkdtemp(prefix="test_vault_links_")
        self.content_dir = Path(self.temp_dir) / "content"
        self.content_dir.mkdir(parents=True)

    def tearDown(self):
        shutil.rmtree(self.temp_dir, ignore_errors=True)

    def test_strip_code_blocks_and_inline_code(self):
        """Verify code blocks with array literals are excluded from wikilink parsing."""
        doc = self.content_dir / "CodeNote.md"
        doc.write_text(
            "# Code Note\n\n"
            "```javascript\n"
            "const arr = [[1, [2]], [3]];\n"
            "```\n\n"
            "~~~python\n"
            "matrix = [[1, 2], [3, 4]]\n"
            "~~~\n\n"
            "Here is inline code: `[[inline_fake_link]]` should be ignored.\n",
            encoding="utf-8"
        )
        res = check_links.scan_vault(self.content_dir)
        self.assertEqual(res["total_links"], 0)
        self.assertEqual(len(res["broken_links"]), 0)

    def test_valid_wikilink_and_shortest_resolution(self):
        """Verify standard wikilinks resolve via shortest path."""
        sub = self.content_dir / "Subfolder"
        sub.mkdir()
        target = sub / "TargetNote.md"
        target.write_text("# Target Note\nContent here.", encoding="utf-8")

        source = self.content_dir / "SourceNote.md"
        source.write_text("Link to [[TargetNote]] and [[TargetNote|Alias]].", encoding="utf-8")

        res = check_links.scan_vault(self.content_dir)
        self.assertEqual(res["total_links"], 2)
        self.assertEqual(len(res["broken_links"]), 0)

    def test_broken_wikilink_detected(self):
        """Verify non-existent target is flagged as broken."""
        source = self.content_dir / "SourceNote.md"
        source.write_text("Broken link: [[NonExistentNote]].", encoding="utf-8")

        res = check_links.scan_vault(self.content_dir)
        self.assertEqual(res["total_links"], 1)
        self.assertEqual(len(res["broken_links"]), 1)
        self.assertIn("not found in vault", res["broken_links"][0]["reason"])

    def test_internal_anchor_resolution(self):
        """Verify internal heading anchors [[#heading]] resolution."""
        note = self.content_dir / "HeadingNote.md"
        note.write_text(
            "# Main Title\n\n"
            "## Section One\n\n"
            "Link to [[#Section One]] and [[#section-one]].\n"
            "Link to [[#NonExistentHeading]].\n",
            encoding="utf-8"
        )
        res = check_links.scan_vault(self.content_dir)
        self.assertEqual(res["total_links"], 3)
        self.assertEqual(len(res["broken_links"]), 1)
        self.assertIn("NonExistentHeading", res["broken_links"][0]["raw"])

    def test_media_embed_resolution(self):
        """Verify media embed ![[image.png]] resolves to asset file."""
        asset_dir = self.content_dir / "Zimmagini"
        asset_dir.mkdir()
        img = asset_dir / "diagram.png"
        img.write_bytes(b"\x89PNG\r\n\x1a\n")

        note = self.content_dir / "EmbedNote.md"
        note.write_text("Here is diagram: ![[diagram.png|300]].", encoding="utf-8")

        res = check_links.scan_vault(self.content_dir)
        self.assertEqual(res["embed_count"], 1)
        self.assertEqual(len(res["broken_links"]), 0)


class TestCheckTags(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.mkdtemp(prefix="test_vault_tags_")
        self.content_dir = Path(self.temp_dir) / "content"
        self.content_dir.mkdir(parents=True)

    def tearDown(self):
        shutil.rmtree(self.temp_dir, ignore_errors=True)

    def test_service_and_draft_files_skipped(self):
        """Verify draft: true, TEMP/ files, and index.md files are skipped from tag enforcement."""
        # 1. index.md
        idx = self.content_dir / "index.md"
        idx.write_text("# Home Index\nWelcome", encoding="utf-8")

        # 2. TEMP file
        temp_dir = self.content_dir / "TEMP"
        temp_dir.mkdir()
        temp_note = temp_dir / "DraftNote.md"
        temp_note.write_text("# Temp Draft\nNotes", encoding="utf-8")

        # 3. Explicit draft: true
        sub = self.content_dir / "Sub"
        sub.mkdir()
        draft_note = sub / "ExplicitDraft.md"
        draft_note.write_text("---\ndraft: true\n---\n# Draft Note", encoding="utf-8")

        res = check_tags.check_tags(self.content_dir)
        self.assertEqual(res["total_files"], 3)
        self.assertEqual(res["draft_count"], 3)
        self.assertEqual(res["valid_count"], 0)
        self.assertEqual(res["invalid_count"], 0)

    def test_valid_tags_flow_and_block_format(self):
        """Verify valid hierarchical tags in flow and block formats pass."""
        # Flow format
        note1 = self.content_dir / "Note1.md"
        note1.write_text(
            "---\ntags: [matematica/geometria, tipologia/teoria]\n---\n# Note 1",
            encoding="utf-8"
        )
        # Block format
        note2 = self.content_dir / "Note2.md"
        note2.write_text(
            "---\ntags:\n  - informatica/cpp/sintassi\n  - tipologia/reference\n---\n# Note 2",
            encoding="utf-8"
        )
        res = check_tags.check_tags(self.content_dir)
        self.assertEqual(res["valid_count"], 2)
        self.assertEqual(res["invalid_count"], 0)

    def test_missing_frontmatter_fails(self):
        """Verify non-draft note without frontmatter is flagged."""
        note = self.content_dir / "RawNote.md"
        note.write_text("# Raw Note without frontmatter", encoding="utf-8")

        res = check_tags.check_tags(self.content_dir)
        self.assertEqual(res["invalid_count"], 1)
        self.assertIn("Missing YAML frontmatter", res["invalid_files"][0][1][0])

    def test_missing_materia_or_tipologia_tag_fails(self):
        """Verify notes lacking either materia or tipologia hierarchy fail."""
        # Only materia
        n1 = self.content_dir / "OnlyMateria.md"
        n1.write_text("---\ntags: [matematica/algebra, informatica/cpp]\n---\n# N1", encoding="utf-8")

        # Only tipologia
        n2 = self.content_dir / "OnlyTipologia.md"
        n2.write_text("---\ntags: [tipologia/teoria, tipologia/guida-pratica]\n---\n# N2", encoding="utf-8")

        # Flat tag
        n3 = self.content_dir / "FlatTag.md"
        n3.write_text("---\ntags: [matematica, tipologia]\n---\n# N3", encoding="utf-8")

        res = check_tags.check_tags(self.content_dir)
        self.assertEqual(res["invalid_count"], 3)

    def test_utf8_bom_handling(self):
        """Verify frontmatter is parsed properly even if UTF-8 BOM is present."""
        bom_note = self.content_dir / "BomNote.md"
        bom_content = "\ufeff---\ntags: [tipsit/sistemi-operativi, tipologia/teoria]\n---\n# BOM Note"
        bom_note.write_text(bom_content, encoding="utf-8")

        res = check_tags.check_tags(self.content_dir)
        self.assertEqual(res["valid_count"], 1)
        self.assertEqual(res["invalid_count"], 0)

    def test_draft_false_requires_tags(self):
        """Verify note with draft: false explicitly requires tags."""
        note = self.content_dir / "ExplicitDraftFalse.md"
        note.write_text("---\ndraft: false\n---\n# Content", encoding="utf-8")
        res = check_tags.check_tags(self.content_dir)
        self.assertEqual(res["invalid_count"], 1)
        self.assertIn("Missing 'tags' key", res["invalid_files"][0][1][0])

    def test_adversarial_yaml_formatting_and_comments(self):
        """Verify frontmatter with comments, empty lines, and quoted tags is handled properly."""
        note = self.content_dir / "FormattedNote.md"
        content = (
            "---\n"
            "# Header comment\n"
            "title: Note Title\n"
            "\n"
            "tags:\n"
            "  # Topic tag\n"
            "  - 'matematica/trigonometria'\n"
            "  # Type tag\n"
            "  - \"tipologia/esercizi\"\n"
            "---\n"
            "# Body\n"
        )
        note.write_text(content, encoding="utf-8")
        res = check_tags.check_tags(self.content_dir)
        self.assertEqual(res["valid_count"], 1)
        self.assertEqual(res["invalid_count"], 0)

    def test_adversarial_wikilink_accents_and_special_chars(self):
        """Verify links with accents and spaces resolve accurately."""
        sub = self.content_dir / "Special"
        sub.mkdir()
        target = sub / "Proprietà dei sistemi.md"
        target.write_text("# Proprietà dei sistemi\n## **Caratteristiche Principali**\n", encoding="utf-8")

        source = self.content_dir / "SourceSpecial.md"
        source.write_text(
            "Link [[Proprietà dei sistemi]]\n"
            "Link with anchor [[Proprietà dei sistemi#Caratteristiche Principali]]\n"
            "Link with alias [[Proprietà dei sistemi|Proprieta]]\n",
            encoding="utf-8"
        )
        res = check_links.scan_vault(self.content_dir)
        self.assertEqual(res["total_links"], 3)
        self.assertEqual(len(res["broken_links"]), 0)

if __name__ == "__main__":
    unittest.main()
