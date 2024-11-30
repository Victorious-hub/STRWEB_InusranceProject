import React from 'react';
import Block from '../../components/UI/Block/Block'
import './../Styles.css'

const FAQ = () => {
    return (
        <div className="page">
            <Block>
                <h2>Frequently Asked Questions</h2>

                <p>
                    <details>
                        <summary>
                            <small><mark><time dateTime="2023-11-18">2023-11-18</time></mark></small> What is the insurance company "SYNCHRONIZATION"?
                        </summary>
                        <p>
                            <abbr title="SYNCHRONIZATION">"SYNCHRONIZATION"</abbr> is a modern insurance company specializing in providing high-quality insurance services.
                        </p>
                    </details>
                </p>
                <p>
                    <details>
                        <summary>
                            <small><mark><time dateTime="2023-12-09">2023-12-09</time></mark></small> Where is the company "SYNCHRONIZATION" located?
                        </summary>
                        <p>
                            The insurance company "SYNCHRONIZATION" is located at:
                            <a href="https://yandex.by/maps/-/CDQxmROv" target="_blank">Gikalo St. 9, Minsk, Belarus</a>.
                        </p>
                    </details>
                </p>
                <p>
                    <details>
                        <summary>
                            <small><mark><time dateTime="2023-03-28">2023-03-28</time></mark></small> How to contact the company "SYNCHRONIZATION"?
                        </summary>
                        <p>
                            You can contact us by phone at +375 (29) 123-45-67 or send an email to info@synchronization.by.
                        </p>
                    </details>
                </p>

                <Block>
                    <h3>Terms and Definitions</h3>
                    <dl>
                        <dt>What is an insurance policy?</dt>
                        <dd>
                            <dfn>Insurance policy</dfn> is a document that confirms the conclusion of an insurance contract and contains the terms of insurance.
                        </dd>

                        <dt>What is the insurance premium?</dt>
                        <dd>
                            <dfn>Insurance premium</dfn> is the amount of money that the policyholder agrees to pay to the insurer for providing insurance protection.
                        </dd>

                        <dt>What is an insured event?</dt>
                        <dd>
                            <dfn>Insured event</dfn> is an event specified in the insurance contract, upon the occurrence of which the insurer is obligated to make an insurance payment.
                        </dd>

                        <dt>Who is the policyholder?</dt>
                        <dd>
                            <dfn>Policyholder</dfn> is an individual or legal entity that enters into an insurance contract and pays the insurance premium.
                        </dd>

                        <dt>Who is the insurer?</dt>
                        <dd>
                            <dfn>Insurer</dfn> is the insurance company providing insurance protection and taking on the obligations to pay insurance compensation.
                        </dd>

                        <dt>What is insurance compensation?</dt>
                        <dd>
                            <dfn>Insurance compensation</dfn> is the amount of money paid by the insurer to the policyholder or beneficiary upon the occurrence of an insured event.
                        </dd>

                        <dt>Who is the beneficiary?</dt>
                        <dd>
                            <dfn>Beneficiary</dfn> is the person for whose benefit the insurance contract is concluded and who has the right to receive insurance compensation.
                        </dd>
                    </dl>
                </Block>
            </Block>
        </div>
    );
}

export default FAQ;
