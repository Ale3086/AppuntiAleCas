import matplotlib.pyplot as plt
import numpy as np
import os
import shutil

out_dirs = [
    r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\content\Matematica\Numeri Complessi\Zimmagini",
    r"c:\Users\Utente\Downloads\obsidian\CasetiObsidian\Caseti\AppuntiAleCas\content\Matematica\Zimmagini"
]

for d in out_dirs:
    os.makedirs(d, exist_ok=True)

def setup_dark_ax(ax, title=""):
    ax.spines['left'].set_position('zero')
    ax.spines['bottom'].set_position('zero')
    ax.spines['right'].set_color('none')
    ax.spines['top'].set_color('none')
    ax.spines['left'].set_color('#888888')
    ax.spines['bottom'].set_color('#888888')
    ax.tick_params(colors='#cccccc', labelsize=10)
    if title:
        ax.set_title(title, pad=22, color='#ffffff', fontsize=13, fontweight='bold')
    ax.grid(True, linestyle=':', alpha=0.35, color='#aaaaaa')
    ax.set_aspect('equal', adjustable='datalim')
    ax.set_facecolor('none')

def save_fig(fig, name):
    fig.patch.set_facecolor('none')
    for d in out_dirs:
        path = os.path.join(d, name)
        plt.savefig(path, bbox_inches='tight', dpi=160, transparent=True)
    plt.close(fig)

colors = {
    'blue': '#4da6ff',
    'red': '#ff4d4d',
    'green': '#4dff4d',
    'yellow': '#ffff4d',
    'purple': '#d24dff',
    'orange': '#ffa64d',
    'cyan': '#4df5ff',
    'white': '#ffffff'
}

# --- 1. POTENZE DI i E ROTAZIONE DI 90° ---
fig, ax = plt.subplots(figsize=(6, 6))
theta = np.linspace(0, 2*np.pi, 200)
ax.plot(np.cos(theta), np.sin(theta), color='#555555', linestyle='--', linewidth=1.5)

# 4 punti fondamentali
pts = [(1, 0, r'$i^0 = 1$', colors['yellow'], (0.1, 0.1)),
       (0, 1, r'$i^1 = i$', colors['cyan'], (0.1, 0.1)),
       (-1, 0, r'$i^2 = -1$', colors['red'], (-0.8, 0.1)),
       (0, -1, r'$i^3 = -i$', colors['purple'], (0.1, -0.2))]

for x, y, label, col, offset in pts:
    ax.plot(x, y, 'o', color=col, markersize=8)
    ax.text(x + offset[0], y + offset[1], label, color=col, fontsize=12, fontweight='bold')

# Archi di rotazione +90°
for start_ang in [0, np.pi/2, np.pi, 3*np.pi/2]:
    arc_ang = np.linspace(start_ang + 0.15, start_ang + np.pi/2 - 0.15, 30)
    ax.plot(0.6*np.cos(arc_ang), 0.6*np.sin(arc_ang), color=colors['green'], linewidth=1.5)
    # arrow tip
    tip_ang = start_ang + np.pi/2 - 0.15
    ax.annotate('', xy=(0.6*np.cos(tip_ang), 0.6*np.sin(tip_ang)),
                xytext=(0.58*np.cos(tip_ang-0.08), 0.58*np.sin(tip_ang-0.08)),
                arrowprops=dict(arrowstyle="->", color=colors['green'], lw=1.5))

ax.text(0.2, 0.2, r'$\times i$ (+90°)', color=colors['green'], fontsize=11, fontweight='bold')
setup_dark_ax(ax, 'Ciclo delle Potenze di i (Periodo 4)')
ax.set_xlim(-1.6, 1.6)
ax.set_ylim(-1.6, 1.6)
save_fig(fig, 'compl_01_potenze_i.png')

# --- 2. PIANO DI GAUSS, CONIUGATO E OPPOSTO ---
fig, ax = plt.subplots(figsize=(6, 6))
# z = 3 + 2i
a, b = 3, 2
ax.plot([0, a], [0, b], color=colors['cyan'], linewidth=2.5, label=r'$z = a + bi$')
ax.plot(a, b, 'o', color=colors['cyan'], markersize=8)
ax.text(a + 0.15, b + 0.15, r'$z = 3 + 2i$', color=colors['cyan'], fontsize=12, fontweight='bold')

# Coniugato z_bar = 3 - 2i
ax.plot([0, a], [0, -b], color=colors['purple'], linewidth=2, linestyle='-', label=r'Coniugato $\bar{z} = a - bi$')
ax.plot(a, -b, 'o', color=colors['purple'], markersize=8)
ax.text(a + 0.15, -b - 0.35, r'$\bar{z} = 3 - 2i$', color=colors['purple'], fontsize=12, fontweight='bold')

# Opposto -z = -3 - 2i
ax.plot([0, -a], [0, -b], color=colors['orange'], linewidth=2, linestyle='-', label=r'Opposto $-z = -a - bi$')
ax.plot(-a, -b, 'o', color=colors['orange'], markersize=8)
ax.text(-a - 1.6, -b - 0.35, r'$-z = -3 - 2i$', color=colors['orange'], fontsize=12, fontweight='bold')

# Tratteggi
ax.plot([a, a], [-b, b], ':', color='#888888')
ax.plot([-a, a], [0, 0], color='none')
ax.plot([0, a], [b, b], ':', color='#888888')
ax.plot([0, a], [-b, -b], ':', color='#888888')

ax.text(3.3, 0.2, 'Re (Asse Reale)', color='#cccccc', fontsize=10)
ax.text(0.15, 3.2, 'Im (Asse Immaginario)', color='#cccccc', fontsize=10)

setup_dark_ax(ax, 'Piano di Gauss: z, Coniugato e Opposto')
ax.set_xlim(-4.5, 4.5)
ax.set_ylim(-3.8, 3.8)
leg = ax.legend(loc='upper left', facecolor='#1e1e1e', edgecolor='#666666')
for t in leg.get_texts(): t.set_color('#ffffff')
save_fig(fig, 'compl_02_piano_gauss.png')

# --- 3. COORDINATE POLARI E FORMA TRIGONOMETRICA ---
fig, ax = plt.subplots(figsize=(6, 6))
r = 4.0
alpha = np.pi/6  # 30 deg
a = r * np.cos(alpha)
b = r * np.sin(alpha)

# Vettore r
ax.plot([0, a], [0, b], color=colors['yellow'], linewidth=2.5, label=r'Modulo $r = |z| = \sqrt{a^2+b^2}$')
ax.plot(a, b, 'o', color=colors['yellow'], markersize=8)
ax.text(a + 0.15, b + 0.15, r'$P(a, b) \equiv [r; \alpha]$', color=colors['yellow'], fontsize=11, fontweight='bold')

# Componenti cateti
ax.plot([0, a], [0, 0], color=colors['blue'], linewidth=2.5, label=r'Parte Reale $a = r\cos\alpha$')
ax.plot([a, a], [0, b], color=colors['red'], linewidth=2.5, label=r'Parte Immaginaria $b = r\sin\alpha$')

# Arco angolo alpha
arc_t = np.linspace(0, alpha, 40)
ax.plot(1.3*np.cos(arc_t), 1.3*np.sin(arc_t), color=colors['green'], linewidth=2)
ax.text(1.5, 0.35, r'$\alpha$ (Argomento)', color=colors['green'], fontsize=11, fontweight='bold')

# Formula a lato
ax.text(1.2, 2.8, r'$r = \sqrt{a^2 + b^2}$' + '\n' + r'$\tan\alpha = \frac{b}{a}$',
        color='#ffffff', fontsize=11, bbox=dict(boxstyle='round,pad=0.5', facecolor='#222222', edgecolor='#666666'))

setup_dark_ax(ax, 'Coordinate Polari nel Piano Complesso')
ax.set_xlim(-0.8, 4.8)
ax.set_ylim(-0.8, 4.2)
leg = ax.legend(loc='upper left', facecolor='#1e1e1e', edgecolor='#666666', fontsize=9)
for t in leg.get_texts(): t.set_color('#ffffff')
save_fig(fig, 'compl_03_coord_polari.png')

# --- 4. PRODOTTO IN FORMA TRIGONOMETRICA: ROTOTRASLAZIONE ---
fig, ax = plt.subplots(figsize=(6, 6))
r1, a1 = 1.6, np.pi/6     # 30 deg
r2, a2 = 1.4, np.pi/4     # 45 deg
r3 = r1 * r2              # 2.24
a3 = a1 + a2              # 75 deg

ax.plot([0, r1*np.cos(a1)], [0, r1*np.sin(a1)], color=colors['cyan'], linewidth=2, label=r'$z_1 = [r_1; \alpha]$ (30°)')
ax.plot([0, r2*np.cos(a2)], [0, r2*np.sin(a2)], color=colors['purple'], linewidth=2, label=r'$z_2 = [r_2; \beta]$ (45°)')
ax.plot([0, r3*np.cos(a3)], [0, r3*np.sin(a3)], color=colors['yellow'], linewidth=2.8, label=r'$z_1 \cdot z_2 = [r_1 r_2; \alpha+\beta]$ (75°)')

ax.plot(r1*np.cos(a1), r1*np.sin(a1), 'o', color=colors['cyan'])
ax.plot(r2*np.cos(a2), r2*np.sin(a2), 'o', color=colors['purple'])
ax.plot(r3*np.cos(a3), r3*np.sin(a3), 'o', color=colors['yellow'])

# Archi angoli
t1 = np.linspace(0, a1, 30)
t3 = np.linspace(0, a3, 50)
ax.plot(0.8*np.cos(t1), 0.8*np.sin(t1), color=colors['cyan'], linewidth=1.2)
ax.plot(1.1*np.cos(t3), 1.1*np.sin(t3), color=colors['yellow'], linestyle='--', linewidth=1.5)
ax.text(1.2, 0.7, r'$\alpha + \beta$', color=colors['yellow'], fontsize=11, fontweight='bold')

setup_dark_ax(ax, 'Prodotto di Complessi: Somma di Angoli')
ax.set_xlim(-0.5, 2.6)
ax.set_ylim(-0.5, 2.6)
leg = ax.legend(loc='upper left', facecolor='#1e1e1e', edgecolor='#666666', fontsize=9)
for t in leg.get_texts(): t.set_color('#ffffff')
save_fig(fig, 'compl_04_prodotto_rotazione.png')

# --- 5. RADICI CUBICHE DELL'UNITÀ (TRIANGOLO EQUILATERO) ---
fig, ax = plt.subplots(figsize=(6, 6))
theta = np.linspace(0, 2*np.pi, 200)
ax.plot(np.cos(theta), np.sin(theta), color='#555555', linestyle='--', linewidth=1.5)

# 3 radici
angles = [0, 2*np.pi/3, 4*np.pi/3]
pts_x = [np.cos(th) for th in angles]
pts_y = [np.sin(th) for th in angles]

# Poligono (triangolo)
tri_x = pts_x + [pts_x[0]]
tri_y = pts_y + [pts_y[0]]
ax.plot(tri_x, tri_y, color=colors['yellow'], linewidth=2, label='Triangolo Equilatero inscritto')
ax.fill(tri_x, tri_y, color=colors['yellow'], alpha=0.15)

labels = [r'$u_0 = 1$ (0°)',
          r'$u_1 = -\frac{1}{2} + i\frac{\sqrt{3}}{2}$ (120°)',
          r'$u_2 = -\frac{1}{2} - i\frac{\sqrt{3}}{2}$ (240°)']
offsets = [(0.1, 0.05), (-0.8, 0.15), (-0.8, -0.25)]

for px, py, lbl, off in zip(pts_x, pts_y, labels, offsets):
    ax.plot(px, py, 'o', color=colors['cyan'], markersize=8)
    ax.text(px + off[0], py + off[1], lbl, color=colors['cyan'], fontsize=11, fontweight='bold')

setup_dark_ax(ax, 'Radici Cubiche dell\'Unità (³√1)')
ax.set_xlim(-1.6, 1.6)
ax.set_ylim(-1.6, 1.6)
leg = ax.legend(loc='lower left', facecolor='#1e1e1e', edgecolor='#666666', fontsize=9)
for t in leg.get_texts(): t.set_color('#ffffff')
save_fig(fig, 'compl_05_radici_cubiche_unita.png')

# --- 6. RADICI CUBICHE DI UN NUMERO COMPLESSO GENERICO (Dal libro: z = -8i) ---
fig, ax = plt.subplots(figsize=(6, 6))
r = 2.0
theta = np.linspace(0, 2*np.pi, 200)
ax.plot(r*np.cos(theta), r*np.sin(theta), color='#555555', linestyle='--', linewidth=1.5)

# Radici di z = 8(cos 3pi/2 + i sin 3pi/2) -> Raggio r=2, angoli pi/2, 7pi/6, 11pi/6
ang_z = [np.pi/2, 7*np.pi/6, 11*np.pi/6]
zx = [r*np.cos(a) for a in ang_z]
zy = [r*np.sin(a) for a in ang_z]

tri_zx = zx + [zx[0]]
tri_zy = zy + [zy[0]]
ax.plot(tri_zx, tri_zy, color=colors['green'], linewidth=2, label=r'Radici cubiche di $z = -8i$ ($R=2$)')
ax.fill(tri_zx, tri_zy, color=colors['green'], alpha=0.15)

zlabels = [r'$z_0 = 2i$ ($\frac{\pi}{2}$)',
           r'$z_1 = -\sqrt{3} - i$ ($\frac{7\pi}{6}$)',
           r'$z_2 = \sqrt{3} - i$ ($\frac{11\pi}{6}$)']
zoffsets = [(-0.35, 0.2), (-1.2, -0.3), (0.1, -0.3)]

for px, py, lbl, off in zip(zx, zy, zlabels, zoffsets):
    ax.plot(px, py, 'o', color=colors['red'], markersize=8)
    ax.text(px + off[0], py + off[1], lbl, color=colors['white'], fontsize=10, fontweight='bold')

setup_dark_ax(ax, 'Radici Cubiche di z = -8i')
ax.set_xlim(-2.8, 2.8)
ax.set_ylim(-2.8, 2.8)
leg = ax.legend(loc='lower left', facecolor='#1e1e1e', edgecolor='#666666', fontsize=9)
for t in leg.get_texts(): t.set_color('#ffffff')
save_fig(fig, 'compl_06_radici_n_generiche.png')

# --- 7. FORMA ESPONENZIALE ED IDENTITÀ DI EULERO ---
fig, ax = plt.subplots(figsize=(6, 6))
theta = np.linspace(0, 2*np.pi, 200)
ax.plot(np.cos(theta), np.sin(theta), color='#555555', linestyle='--', linewidth=1.5)

# Punto e^(i pi) = -1
ax.plot(-1, 0, 'o', color=colors['red'], markersize=10)
ax.text(-1.45, 0.15, r'$e^{i\pi} = -1$', color=colors['red'], fontsize=12, fontweight='bold')
ax.text(-1.45, -0.25, r'$e^{i\pi} + 1 = 0$', color=colors['yellow'], fontsize=12, fontweight='bold')

# Punto generico e^(i alpha)
ang = np.pi/3
ax.plot([0, np.cos(ang)], [0, np.sin(ang)], color=colors['cyan'], linewidth=2.5)
ax.plot(np.cos(ang), np.sin(ang), 'o', color=colors['cyan'], markersize=8)
ax.text(np.cos(ang)+0.1, np.sin(ang)+0.1, r'$e^{i\alpha} = \cos\alpha + i\sin\alpha$', color=colors['cyan'], fontsize=11, fontweight='bold')

# Semicirconferenza di rotazione pi
arc_pi = np.linspace(0, np.pi, 80)
ax.plot(0.5*np.cos(arc_pi), 0.5*np.sin(arc_pi), color=colors['yellow'], linewidth=2)
ax.annotate('', xy=(-0.5, 0), xytext=(-0.5, 0.08), arrowprops=dict(arrowstyle="->", color=colors['yellow'], lw=2))
ax.text(-0.15, 0.6, r'$\pi$ rad', color=colors['yellow'], fontsize=12, fontweight='bold')

setup_dark_ax(ax, 'Formula e Identità di Eulero')
ax.set_xlim(-1.6, 1.6)
ax.set_ylim(-1.4, 1.4)
save_fig(fig, 'compl_07_eulero.png')

print("All 7 complex numbers diagrams generated successfully in both directories.")
