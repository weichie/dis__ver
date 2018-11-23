import React from 'react';

import './About.css';
import me from'./me.jpg';

const About = () => (
	<div className="about--wrapper">
		<img src={me} alt="Bob Weichler"/>
		<div className="about-info">
			<div className="inner">
				<h4>Web Developer</h4>
				<h1>Bob Weichler</h1>
				<p>
					Please keep in mind that the list of restaurants and bars are my personal list. I didn't went to every restaurant in the city and I just kept a small list of the restaurants that I would visit twice or more if I could.
				</p>
				<p className="two-col">
					I'm a 25-year old enthusiast web developer from Belgium. 
					I was active as a front-end developer at <a href="http://nightowlinteractive.com" target="_blank" rel="noopener noreferrer">Night Owl Interactive</a> for 2 years.
					I fell in love with javascript and jQuery and started out experimenting on the side with other frameworks like AngularJS and React.
					During the past summer I followed a React Pro Intense course to learn myself some React best practices. I created this sideproject as test for myself to see what I can build using React.
				</p>
				<ul className="social-list">
					<li><a href="https://www.instagram.com/weichiie/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
					<li><a href="https://www.linkedin.com/in/bobweichler/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
					<li><a href="https://github.com/weichie" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a></li>
					<li><a href="https://awards.weichieprojects.com/"><i className="fas fa-trophy"></i></a></li>
				</ul>
			</div>
		</div>
	</div>
);

export default About;