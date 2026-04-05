import React from 'react';
import LinkedinIcon from '../images/linkedin-icon.svg';
import GithubIcon from '../images/github-icon.svg'; 

function AboutMe() {
  return (
    <section className="about">
      <h2 className="about__title">About Me</h2>
      <div className="about__content">
        <div className="about__text-block">
          <p className="about__text">
            Hello, my name is Wesley, and I am currently focused on becoming a Frontend Developer. I enjoy building user interfaces and creating modern, interactive experiences.
          </p>
          <p className="about__text">
            I work with React, JavaScript, TypeScript, and Tailwind CSS, constantly improving my skills through projects like this one.
          </p>
          <p className="about__text">
            Outside of coding, I enjoy FPS, RPG, hack and slash, and choice-driven games, as well as reading horror books.
          </p>
        </div>
        <div className="about__skills">
          <h3 className="about__subtitle">Skills</h3>
          <div className="about__badges">
            <span className="about__badge">React</span>
            <span className="about__badge">JavaScript</span>
            <span className="about__badge">TypeScript</span>
            <span className="about__badge">Tailwind CSS</span>
          </div>
        </div>
        <div className="about__genres">
          <h3 className="about__subtitle">Favorite Genres</h3>
          <div className="about__genres-list">
            <span>🎯 FPS</span>
            <span>⚔️ Hack & Slash</span>
            <span>🧙 RPG</span>
            <span>🧠 Choice-driven</span>
          </div>
        </div>
        <div className="about__links">
          <h3 className="about__subtitle">Find me on:</h3>
          <div className="about__links-list">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="about__link about__link--github"
          >
            <img
              src={GithubIcon}
              alt="GitHub"
              className="about__link-icon"
            />
            <span className="about__link-text">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="about__link about__link--linkedin"
          >
            <img
              src={LinkedinIcon}
              alt="LinkedIn"
              className="about__link-icon"
            />
            <span className="about__link-text">LinkedIn</span>
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
