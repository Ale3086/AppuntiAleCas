Il selection sort è un algoritmo di ordinamento di un array che va a dividere l'array in due, una parte iniziale ordinata e la seconda parte non ordinata da cui va a cercare sempre il minimo da inserire nella parte ordinata. 

L’algoritmo sostanzialmente seleziona di volta in volta il numero minore nella parte non ordinata e lo sposta in quella ordinata, sostituendo il valore nella posizione i con il valore minore trovato nell'array non ordinato.

Con questo algoritmo la prima parte ad essere ordinata è l'inizio.

![[Sorting_selection_sort_anim.gif|697]]

## Codice funzione Selection Sort

```cpp
void selection_sort(int arr[], int size) 
{
    int temp;
    int min;
    for (int i = 0; i < size; i++) {
        min=i;
        for (int j = i; j < size; j++) {
            if (arr[j]<arr[min]) {
                min=j;
            }
        }
        temp=arr[min];
        arr[min]=arr[i];
        arr[i]=temp;
    }
}
```

#### Per testare:

```cpp
#include <iostream>
#include <ctime>  
#include <cstdlib>

using namespace std;

void selection_sort(int arr[], int size) 
{
    int temp;
    int min;
    for (int i = 0; i < size; i++) {
        min=i;
        for (int j = i; j < size; j++) {
            if (arr[j]<arr[min]) {
                min=j;
            }
        }
        temp=arr[min];
        arr[min]=arr[i];
        arr[i]=temp;
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

    selection_sort(numeri, size);

    cout << endl << endl << "Array ordinato: " << endl;
    for (int i = 0; i < size; i++) {
        cout << numeri[i] << " ";
    }
    cout << endl;
    return 0;
}
```
