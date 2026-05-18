## Indice

- [[#length / size]]
- [[#empty]]
- [[#clear]]
- [[#append]]
- [[#substr]]
- [[#find]]
- [[#rfind]]
- [[#replace]]
- [[#erase]]
- [[#insert]]
- [[#compare]]
- [[#at]]
- [[#front / back]]
- [[#c_str]]
- [[#to_string]]
- [[#stoi / stof / stod]]

---

## length / size

Restituisce la lunghezza della stringa in caratteri.

```cpp
#include <string>
std::string s = "ciao";
std::cout << s.length(); // 4
std::cout << s.size();   // 4
```

---

## empty

Restituisce `true` se la stringa è vuota.

```cpp
std::string s = "";
std::cout << s.empty(); // 1 (true)
```

---

## clear

Svuota la stringa.

```cpp
std::string s = "hello";
s.clear();
// s = ""
```

---

## append

Aggiunge una stringa (o carattere) in coda.

```cpp
std::string s = "hello";
s.append(" world");
// s = "hello world"
```

---

## substr

Restituisce una sottostringa a partire da una posizione, di lunghezza specificata.

```cpp
std::string s = "hello world";
std::cout << s.substr(6, 5); // "world"
```

---

## find

Cerca la prima occorrenza di una sottostringa. Restituisce `std::string::npos` se non trovata.

```cpp
std::string s = "hello world";
size_t pos = s.find("world");
std::cout << pos; // 6
```

---

## rfind

Cerca l'ultima occorrenza di una sottostringa.

```cpp
std::string s = "abcabc";
std::cout << s.rfind("b"); // 4
```

---

## replace

Sostituisce una porzione della stringa con un'altra.

```cpp
std::string s = "hello world";
s.replace(6, 5, "C++");
// s = "hello C++"
```

---

## erase

Rimuove caratteri dalla stringa a partire da una posizione.

```cpp
std::string s = "hello!";
s.erase(5, 1);
// s = "hello"
```

---

## insert

Inserisce una stringa in una posizione specificata.

```cpp
std::string s = "helo";
s.insert(3, "l");
// s = "hello"
```

---

## compare

Confronta due stringhe. Restituisce 0 se uguali, <0 o >0 altrimenti.

```cpp
std::string a = "apple", b = "apple";
std::cout << a.compare(b); // 0
```

---

## at

Accede al carattere in posizione specificata con controllo dei bounds.

```cpp
std::string s = "hello";
std::cout << s.at(1); // 'e'
```

---

## front / back

Restituiscono rispettivamente il primo e l'ultimo carattere.

```cpp
std::string s = "hello";
std::cout << s.front(); // 'h'
std::cout << s.back();  // 'o'
```

---

## c_str

Restituisce un puntatore a una stringa C-style (`const char*`).

```cpp
std::string s = "hello";
const char* cs = s.c_str();
printf("%s", cs); // hello
```

---

## to_string

Converte un valore numerico in `std::string`.

```cpp
int n = 42;
std::string s = std::to_string(n);
// s = "42"
```

---

## stoi / stof / stod

Convertono una stringa rispettivamente in `int`, `float`, `double`.

```cpp
std::string s = "123";
int n = std::stoi(s);   // 123

std::string f = "3.14";
double d = std::stod(f); // 3.14
```

---
#Linguaggio_cpp #Librerie_cpp