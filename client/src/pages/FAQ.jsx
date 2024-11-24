import React from 'react';
import Block from '../components/UI/Block/Block'
import './Styles.css'

const FAQ = () => {
    return (
        <div class="page">
            <Block>
                <h2>Часто задаваемые вопросы</h2>

                <p>
                    <details>
                        <summary>
                            <small><mark><time datetime="2023-11-18">2023-11-18</time></mark></small> Что такое страховая фирма "СИНХРОНИЗАЦИЯ"?
                        </summary>
                        <p>
                            <abbr title="СИНХРОНИЗАЦИЯ">"СИНХРОНИЗАЦИЯ"</abbr> - это современная страховая фирма, специализирующаяся на
                            предоставлении высококачественных страховых услуг.
                        </p>
                    </details>
                </p>
                <p>
                    <details>
                        <summary>
                            <small><mark><time datetime="2023-12-09">2023-12-09</time></mark></small> Где находится фирма "СИНХРОНИЗАЦИЯ"?
                        </summary>
                        <p>
                            Страховая фирма "СИНХРОНИЗАЦИЯ" расположена по адресу:
                            <a href="https://yandex.by/maps/-/CDQxmROv" target="_blank">ул. Гикало, 9. Минск, Беларусь</a>.
                        </p>
                    </details>
                </p>
                <p>
                    <details>
                        <summary>
                            <small><mark><time datetime="2023-03-28">2023-03-28</time></mark></small> Как связаться с фирмой "СИНХРОНИЗАЦИЯ"?
                        </summary>
                        <p>
                            Вы можете связаться с нами по телефону +375 (29) 123-45-67 или отправить письмо на электронную почту info@synchronization.by.
                        </p>
                    </details>
                </p>

                <Block>
                    <h3>Термины и понятия</h3>
                    <dl>
                        <dt>Что такое страховой полис?</dt>
                        <dd>
                            <dfn>Страховой полис</dfn> - это документ, подтверждающий заключение договора страхования и содержащий условия страхования.
                        </dd>

                        <dt>Что такое страховая премия?</dt>
                        <dd>
                            <dfn>Страховая премия</dfn> - это сумма денег, которую страхователь обязуется уплатить страховщику за предоставление страховой защиты.
                        </dd>

                        <dt>Что такое страховой случай?</dt>
                        <dd>
                            <dfn>Страховой случай</dfn> - это событие, предусмотренное договором страхования, при наступлении которого страховщик обязан произвести страховую выплату.
                        </dd>

                        <dt>Что такое страхователь?</dt>
                        <dd>
                            <dfn>Страхователь</dfn> - это физическое или юридическое лицо, заключающее договор страхования и уплачивающее страховую премию.
                        </dd>

                        <dt>Что такое страховщик?</dt>
                        <dd>
                            <dfn>Страховщик</dfn> - это страховая компания, предоставляющая страховую защиту и принимающая на себя обязательства по выплате страхового возмещения.
                        </dd>

                        <dt>Что такое страховое возмещение?</dt>
                        <dd>
                            <dfn>Страховое возмещение</dfn> - это сумма денег, выплачиваемая страховщиком страхователю или выгодоприобретателю при наступлении страхового случая.
                        </dd>

                        <dt>Что такое выгодоприобретатель?</dt>
                        <dd>
                            <dfn>Выгодоприобретатель</dfn> - это лицо, в пользу которого заключен договор страхования и которое имеет право на получение страхового возмещения.
                        </dd>
                    </dl>
                </Block>
            </Block>
        </div>
    );
}

export default FAQ;