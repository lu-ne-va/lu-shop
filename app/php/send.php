<?php
if($_POST) {
    $to = 'urla48@yandex.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'Письмо с сайта LU-SHOP'; //Загаловок сообщения
    $message = '
                <html>
                    <head>
                        <title>' . $subject . '</title>
                    </head>
                    <body>
                        <p>Имя: ' . $_POST['name'] . '</p>
                        <p>Телефон: ' . $_POST['phone'] . '</p>
                        <p>Дата: ' . $_POST['day'] . '</p>
                        <p>Время: ' . $_POST['month'] . '</p>
                        <p>Комментарий: ' . $_POST['comment'] . '</p>
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: <mail-box@lu-shop.ru>\r\n"; //Наименование и почта отправителя
    mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}
?>