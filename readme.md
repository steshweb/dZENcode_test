1. Сервер принимает комментарии, валидирует их, преобразует файлы, сохраняет их в локальное хранилище. Затем записывает данные о комментарии в базу данных postgreSQL.
2. GET /api/comments возвращает все комментарии в ввиде json согласно их иерархии.
3. GET /api/comments/id возвращает комментарий по id c его подкомментариями в ввиде json.
2. POST /api/comments записывает комментарий в базу данных. 
{
    "user_name": String, - require
    "email": String, - require
    "message_text": String", - require
    "parent_id": Null | Number, - require
    "home_page": String,
    "captcha": String "1234" Default - require
 }
 file - если к комментарию прикреплен файл, то он должен иметь название "file"
 ограничение размера до 10 мб, ограничение по разширениям txt | png | jpg | gif, размер txt файла до 10 кб.
 parent_id - поле должно содержать либо Null (если комментарий верхнего уровня), либо Number (если комментарий является дочерним, ответом на другой комментарий).
 message_text - ожидает сообщение с возможным присутствием следующих html тугов: <a>, <strong>, <code>, <i>. Будет просисходить валидация на закрытие и отрытие тегов. 

2. Docker image - docker pull steshweb/dzencode:latest
3. Hosting - https://dzencode-test-83ff.onrender.com
4. .env 
DATABASE_URL=postgres://tbamhowh:vDfqiIIqjAUJwoeWFlAZV8UsXg7kN6On@flora.db.elephantsql.com/tbamhowh
PORT=3000
https://github.com/steshweb/dZENcode_test/tree/main