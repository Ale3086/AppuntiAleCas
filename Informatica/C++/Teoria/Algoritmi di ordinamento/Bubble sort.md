E’ un algoritmo semplice basato sul metodo degli scambi. 

L’algoritmo confronta a due a due gli elementi adiacenti e li scambia tra loro. Se il primo elemento è maggiore del secondo quest’ultimo verrà spostato verso sinistra. Questo è il motivo anche di perché viene chiamato bubble sort, perché come le bolle la prima parte a essere ordinata e la parte maggiore dell'array.

Ripetendo N-1 volte questa operazione, tutti i valori risalgono verso destra fino ad occupare la posizione corretta e quindi ordinati in senso crescente.

Per ottimizzazione si mette una sentinella che controlla se ci sono state sostituzioni in un ciclo, se non ci sono state si blocca tutto.

![[Sorting_bubblesort_anim.gif|683]]

## Codice funzione bubble sort

``` cpp
void bubble_sort(int arr[], int size) 
{
    int temp;
    int sentinella;
    for (int i = size - 1; i >= 0; i--) {
        sentinella = 0;
        for (int j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                sentinella++;
            }
        }
        if (sentinella == 0) {
            break;
        }
    }
}
```

#### Per testare:

```cpp
#include <iostream>
#include <ctime>  
#include <cstdlib>

using namespace std;

void bubble_sort(int arr[], int size) 
{
    int temp;
    int sentinella;
    for (int i = size - 1; i >= 0; i--) {
        sentinella = 0;
        for (int j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                sentinella++;
            }
        }
        if (sentinella == 0) {
            break;
        }
    }
}

int main()
{
    srand(time(0)); 
    int numeri[50];
    int size = 50;
    cout << "Array non ordinato: ";
    for (int i = 0; i < size; i++) {
        numeri[i] = rand() % 1001;
        cout << numeri[i] << " ";
    }

    bubble_sort(numeri, size);

    cout << endl << endl << "Array ordinato: " << endl;
    for (int i = 0; i < size; i++) {
        cout << numeri[i] << " ";
    }
    cout << endl;
    return 0;
}
```