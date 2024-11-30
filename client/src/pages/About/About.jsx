import React from 'react';
import Block from '../../components/UI/Block/Block'
import '../../App.css'

const About = () => {
    return (
        <div className="page">
            <Block>
                <h2>About the Company</h2>

                <p>
                    <strong><abbr title="SYNCHRONIZATION">"SYNCHRONIZATION"</abbr></strong> is a <em>modern insurance company</em>,
                    located in the center of Minsk, Belarus. We specialize in providing high-quality <strong>insurance services</strong>
                    and care about your <em>peace of mind</em> and <em>security</em>.
                    Our company offers a <u>wide range of insurance products</u>, and our team of specialists has <strong>extensive experience</strong>
                    and <strong>professional skills</strong>.
                </p>

                <p>
                    Our services <em>include</em>:
                    <ul type="circle">
                        <li>Health insurance</li>
                        <li>Car insurance</li>
                        <li>Travel insurance</li>
                        <li>Business insurance</li>
                        <li>Property insurance</li>
                        <li>Life insurance</li>
                        <li>Insurance consulting</li>
                    </ul>
                </p>

                <blockquote>
                    Our <em>mission</em> is to provide our clients with <strong>reliable insurance protection</strong> and offer them a high level of <em>service</em>.
                    <br></br>
                    <span>– Founder of the "SYNCHRONIZATION" company</span>
                </blockquote>
            </Block>
        </div>
    );
}

export default About;
