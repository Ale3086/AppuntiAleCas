E’ più efficiente degli algoritmi visti in precedenza. Funziona efficientemente con array di dimensione molto piccola o con array parzialmente ordinati. 

L’idea di ordinamento è simile al modo in cui un giocatore di bridge ordina le carte nella propria mano. Per trovare la giusta posizione si confronta la carta con le altre che sono nella mano da destra a sinistra. 

Ogni carta più grande verrà spostata verso destra in modo da fare posto alla carta da inserire

![[Sorting_insertion_sort_anim.gif|664]]
## 
Codice funzione Selection Sort

```cpp
void insertion_sort(int arr[], int size) 
{
    int temp;
    for (int i = 1; i < size; i++) {
        for (int j = i ; j > 0; j--) {
            if (arr[j]<arr[j-1]) {
                temp=arr[j];
                arr[j]=arr[j-1];
                arr[j-1]=temp;
            } else {
                break;
            }
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

void insertion_sort(int arr[], int size) 
{
    int temp;
    for (int i = 1; i < size; i++) {
        for (int j = i ; j > 0; j--) {
            if (arr[j]<arr[j-1]) {
                temp=arr[j];
                arr[j]=arr[j-1];
                arr[j-1]=temp;
            } else {
                break;
            }
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

    insertion_sort(numeri, size);

    cout << endl << endl << "Array ordinato: " << endl;
    for (int i = 0; i < size; i++) {
        cout << numeri[i] << " ";
    }
    cout << endl;
    return 0;
}
```