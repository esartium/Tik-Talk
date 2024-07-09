// Интерфейс для пагинации

// Дженерик:
export interface Pageble<T> {
    items: T[], // сама информация, которая нам нужна от запроса
    
    // всякая техническая инфа:
    total: number, 
    page: number,
    size: number,
    pages: number 
}

// Тут мы можем передавать Т как параметр; от него и будеть зависеть тип айтемов