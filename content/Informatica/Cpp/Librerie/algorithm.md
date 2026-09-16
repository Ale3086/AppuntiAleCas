## Indice

- [[#sort]]
- [[#stable_sort]]
- [[#reverse]]
- [[#find]]
- [[#find_if]]
- [[#count]]
- [[#count_if]]
- [[#min_element / max_element]]
- [[#min / max]]
- [[#accumulate]]
- [[#fill]]
- [[#copy]]
- [[#unique]]
- [[#binary_search]]
- [[#lower_bound / upper_bound]]
- [[#for_each]]
- [[#transform]]
- [[#any_of / all_of / none_of]]

---

## sort

Ordina gli elementi in un range in ordine crescente (o secondo un comparatore).

```cpp
#include <algorithm>
#include <vector>
std::vector<int> v = {3, 1, 4, 1, 5};
std::sort(v.begin(), v.end());
// v = {1, 1, 3, 4, 5}
```

---

## stable_sort

Come `sort`, ma preserva l'ordine relativo degli elementi uguali.

```cpp
std::vector<int> v = {3, 1, 4, 1, 5};
std::stable_sort(v.begin(), v.end());
// v = {1, 1, 3, 4, 5}
```

---

## reverse

Inverte l'ordine degli elementi in un range.

```cpp
std::vector<int> v = {1, 2, 3, 4};
std::reverse(v.begin(), v.end());
// v = {4, 3, 2, 1}
```

---

## find

Cerca la prima occorrenza di un valore. Restituisce un iteratore.

```cpp
std::vector<int> v = {10, 20, 30};
auto it = std::find(v.begin(), v.end(), 20);
// it punta a 20
```

---

## find_if

Cerca il primo elemento che soddisfa un predicato.

```cpp
std::vector<int> v = {1, 3, 4, 7};
auto it = std::find_if(v.begin(), v.end(), [](int x){ return x % 2 == 0; });
// it punta a 4
```

---

## count

Conta le occorrenze di un valore in un range.

```cpp
std::vector<int> v = {1, 2, 2, 3, 2};
int c = std::count(v.begin(), v.end(), 2);
// c = 3
```

---

## count_if

Conta gli elementi che soddisfano un predicato.

```cpp
std::vector<int> v = {1, 2, 3, 4, 5};
int c = std::count_if(v.begin(), v.end(), [](int x){ return x > 2; });
// c = 3
```

---

## min_element / max_element

Restituiscono un iteratore all'elemento minimo/massimo del range.

```cpp
std::vector<int> v = {3, 1, 4, 1, 5};
auto mn = std::min_element(v.begin(), v.end()); // punta a 1
auto mx = std::max_element(v.begin(), v.end()); // punta a 5
```

---

## min / max

Restituiscono il minimo/massimo tra due valori.

```cpp
int a = std::min(3, 7); // 3
int b = std::max(3, 7); // 7
```

---

## accumulate

Calcola la somma (o un'operazione cumulativa) degli elementi. Richiede `<numeric>`.

```cpp
#include <numeric>
std::vector<int> v = {1, 2, 3, 4};
int sum = std::accumulate(v.begin(), v.end(), 0);
// sum = 10
```

---

## fill

Riempie un range con un valore specificato.

```cpp
std::vector<int> v(5);
std::fill(v.begin(), v.end(), 7);
// v = {7, 7, 7, 7, 7}
```

---

## copy

Copia gli elementi da un range a un altro.

```cpp
std::vector<int> src = {1, 2, 3};
std::vector<int> dst(3);
std::copy(src.begin(), src.end(), dst.begin());
// dst = {1, 2, 3}
```

---

## unique

Rimuove i duplicati consecutivi (va usato dopo `sort` per rimuovere tutti i duplicati).

```cpp
std::vector<int> v = {1, 1, 2, 3, 3};
auto it = std::unique(v.begin(), v.end());
v.erase(it, v.end());
// v = {1, 2, 3}
```

---

## binary_search

Verifica se un elemento esiste in un range ordinato.

```cpp
std::vector<int> v = {1, 2, 3, 4, 5};
bool found = std::binary_search(v.begin(), v.end(), 3);
// found = true
```

---

## lower_bound / upper_bound

`lower_bound`: primo elemento >= valore.  
`upper_bound`: primo elemento > valore.

```cpp
std::vector<int> v = {1, 2, 4, 4, 5};
auto lo = std::lower_bound(v.begin(), v.end(), 4); // punta al primo 4
auto hi = std::upper_bound(v.begin(), v.end(), 4); // punta a 5
```

---

## for_each

Applica una funzione a ciascun elemento del range.

```cpp
std::vector<int> v = {1, 2, 3};
std::for_each(v.begin(), v.end(), [](int x){ std::cout << x << " "; });
// 1 2 3
```

---

## transform

Applica una funzione a ogni elemento e scrive il risultato in un output range.

```cpp
std::vector<int> v = {1, 2, 3};
std::vector<int> out(3);
std::transform(v.begin(), v.end(), out.begin(), [](int x){ return x * 2; });
// out = {2, 4, 6}
```

---

## any_of / all_of / none_of

Verificano se rispettivamente almeno uno / tutti / nessuno degli elementi soddisfano un predicato.

```cpp
std::vector<int> v = {1, 3, 5, 7};
bool a = std::any_of(v.begin(),  v.end(), [](int x){ return x > 5; }); // true
bool b = std::all_of(v.begin(),  v.end(), [](int x){ return x > 0; }); // true
bool c = std::none_of(v.begin(), v.end(), [](int x){ return x < 0; }); // true
```

---
#Linguaggio_cpp #Librerie_cpp