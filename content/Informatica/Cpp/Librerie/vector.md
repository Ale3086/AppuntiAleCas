## Indice

- [[#push_back]]
- [[#pop_back]]
- [[#size]]
- [[#empty]]
- [[#clear]]
- [[#at]]
- [[#front]]
- [[#back]]
- [[#insert]]
- [[#erase]]
- [[#resize]]
- [[#reserve]]
- [[#begin / end]]
- [[#emplace_back]]

---

## push_back

Aggiunge un elemento in fondo al vettore.

```cpp
#include <vector>
#include <iostream>
int main() {
    std::vector<int> v;
    v.push_back(10);
    v.push_back(20);
    // v = {10, 20}
}
```

---

## pop_back

Rimuove l'ultimo elemento del vettore.

```cpp
std::vector<int> v = {1, 2, 3};
v.pop_back();
// v = {1, 2}
```

---

## size

Restituisce il numero di elementi presenti nel vettore.

```cpp
std::vector<int> v = {4, 5, 6};
std::cout << v.size(); // 3
```

---

## empty

Restituisce `true` se il vettore è vuoto.

```cpp
std::vector<int> v;
std::cout << v.empty(); // 1 (true)
```

---

## clear

Rimuove tutti gli elementi dal vettore.

```cpp
std::vector<int> v = {1, 2, 3};
v.clear();
// v = {}
```

---

## at

Accede all'elemento all'indice specificato con controllo dei bounds.

```cpp
std::vector<int> v = {10, 20, 30};
std::cout << v.at(1); // 20
```

---

## front

Restituisce il primo elemento del vettore.

```cpp
std::vector<int> v = {5, 10, 15};
std::cout << v.front(); // 5
```

---

## back

Restituisce l'ultimo elemento del vettore.

```cpp
std::vector<int> v = {5, 10, 15};
std::cout << v.back(); // 15
```

---

## insert

Inserisce uno o più elementi in una posizione specificata.

```cpp
std::vector<int> v = {1, 2, 4};
v.insert(v.begin() + 2, 3);
// v = {1, 2, 3, 4}
```

---

## erase

Rimuove un elemento (o un range) dalla posizione specificata.

```cpp
std::vector<int> v = {1, 2, 3, 4};
v.erase(v.begin() + 1);
// v = {1, 3, 4}
```

---

## resize

Ridimensiona il vettore alla dimensione specificata.

```cpp
std::vector<int> v = {1, 2, 3};
v.resize(5, 0);
// v = {1, 2, 3, 0, 0}
```

---

## reserve

Pre-alloca memoria per almeno `n` elementi senza modificare la size.

```cpp
std::vector<int> v;
v.reserve(100);
std::cout << v.capacity(); // >= 100
```

---

## begin / end

Restituiscono iteratori al primo e all'elemento successivo all'ultimo.

```cpp
std::vector<int> v = {1, 2, 3};
for (auto it = v.begin(); it != v.end(); ++it)
    std::cout << *it << " "; // 1 2 3
```

---

## emplace_back

Costruisce un elemento direttamente in fondo al vettore (più efficiente di `push_back` per oggetti complessi).

```cpp
std::vector<std::pair<int,int>> v;
v.emplace_back(1, 2);
// v = {(1,2)}
```

---
#Linguaggio_cpp #Librerie_cpp