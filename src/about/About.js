import React from 'react';

import styles from './About.module.scss';

const About = () => (
  <div>
    <h1>About Me</h1>
    <p>
      Hi I'm James Russo and this is where I'll be writing down
      my thoughts and experiences in topics such as software, web development, and technology.
      However, fairwarning any number of other topics can pop up into this blog.
      This is my first attempt at a blog, and as an engineer I apologize in advance for my
      writing skills.
      Hopefully they will improve as I work on this more and more.
      <br/>
      <br/>
      I am currently a fullstack engineer working fulltime in NYC for
      <a className={styles.link} href="https://rocketsofawesome.com"> Rockets of Awesome, </a>
      a child clothing subscription service and ecommerce brand.
      Outside of my fulltime job, I work with a startup called
      <a className={styles.link} href="https://iteratelabs.co" target="_blank"> Iterate Labs </a>
      which is a pre-seed startup that wants
      to use data-driven insights to develop safer and more comfortable workplaces.
      I graduated from Cornell University in 2017 with a B.S. in Computer Science,
      where I concentrated in Machine Learning and also did research in Systems, Security,
      and Blockchain under Emin Gun Sirer and Soumya Basu.
      Now adays I mostly use technologies such as Ruby on Rails, Flask and Python, React + Redux,
      Postgresql, AWS, and many more web devleopment technologies.
    </p>
  </div>
);

export default About;
