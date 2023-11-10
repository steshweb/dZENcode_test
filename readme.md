1. Для запуска проекта необходимо ввести npm init, npm start.
2. Сервер принимает комментарии, валидирует их, преобразует файлы, сохраняет их в локальное хранилище. Затем записывает данные о комментарии в базу данных postgreSQL.
3. GET /api/comments возвращает все комментарии в ввиде json согласно их иерархии.
4. GET /api/comments/id возвращает комментарий по id c его подкомментариями в ввиде json.
5. POST /api/comments записывает комментарий в базу данных. 
{
    "user_name": String, - required
    "email": String, - required
    "message_text": String", - required
    "parent_id": Null | Number, - required
    "home_page": String,
    "captcha": String "1234" Default - required
 }
 Header "Content-Type": "application/json" если post запрос не содержит file.
 Header "Content-Type": "multipart/form-data" если post запрос содержит file.
 file - если к комментарию прикреплен файл, то он должен иметь название "file"
 ограничение размера до 10 мб, ограничение по разширениям txt | png | jpg | gif, размер txt файла до 100 кб.
 parent_id - поле должно содержать либо Null (если комментарий верхнего уровня), либо Number (если комментарий является    дочерним, ответом на другой комментарий, тогда оно равняется id родительского комментария).
 message_text - ожидает сообщение с возможным присутствием следующих html тугов: <a>, <strong>, <code>, <i>. Будет происходить валидация на закрытие и отрытие тегов. 

6. Docker image - docker pull steshweb/dzencode:latest
7. Hosting - https://dzencode-test-83ff.onrender.com
8. Github - https://github.com/steshweb/dZENcode_test/tree/main
9. .env 
DATABASE_URL
PORT
