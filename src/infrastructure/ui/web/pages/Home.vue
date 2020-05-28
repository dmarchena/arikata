<template>
  <div>
    <section v-bem:hero>
      <h2 v-bem:hero-heading>
        Improve your
        <svg v-bem:jslogo><use xlink:href="#js-logo" /></svg> skills
      </h2>
      <p v-bem:hero-text>
        Practice and repetition are the way of the JS developer
      </p>
      <div v-bem:hero-action>
        <router-link
          to="/katas"
          class="btn btn--ghost"
        >
          Show me the katas!
        </router-link>
      </div>
      <picture v-bem:hero-image>
        <source
          :srcset="heroImage.webp.m"
          media="(min-width: 1980px)"
          type="image/webp"
        >
        <source
          :srcset="heroImage.jpg.m"
          media="(min-width: 1980px)"
          type="image/jpeg"
        >
        <source
          :srcset="heroImage.webp.s"
          type="image/webp"
        >
        <img
          :src="heroImage.jpg.s"
          alt=""
        >
      </picture>
    </section>
    <section v-bem:info>
      <h3 v-bem:info-heading>
        Browser-based JS Katas
      </h3>
      <p v-bem:info-text>
        Code is executed on your browser, so all modern browser are supported
        only. Your browser ECMAScript engine will determine the ES version you
        could use.
      </p>
      <svg><use xlink:href="#browser-ui" /></svg>
    </section>
    <section v-bem:project>
      <h3 v-bem:project-heading>
        Open source project for educational purpose
      </h3>
      <div v-bem:project-text>
        <p>
          This demo site has been developed as final work for Bachelor's Degree
          in Computer Engineering.
        </p>
        <p>The code will be available on GitHub soon.</p>
      </div>
      <ul v-bem:project-features>
        <li v-bem:project-feature>
          <svg><use xlink:href="#feature1" /></svg>
          <strong>Reactive</strong>
          Developed using Vue in order to build a fast and high performance
          front end. It uses Vuex as a cache and app state storage. CSS
          Architecture is based on BEM and 7-1 pattern.
        </li>
        <li v-bem:project-feature>
          <svg><use xlink:href="#logo" /></svg>
          <strong>Hexagonal architecture</strong>
          Designed following DDD and structured in infrastructure, application
          and domain layers. Front end and back end share the same application
          and domain code. Back end runs on a Docker environment with nodejs and
          Postgres and exposes a Rest API to communicate with front end.
        </li>
        <li v-bem:project-feature>
          <svg><use xlink:href="#feature2" /></svg>
          <strong>Code sandbox</strong>
          Text editor is based on
          <a href="https://codemirror.net/">CodeMirror</a> and code runs on a
          sandboxed iframe with a custom window object to isolate it. Minimal
          test runner has been coded and chai is used as assertion library.
        </li>
      </ul>
      <picture v-bem:project-background>
        <source
          :srcset="projectInfoBackground.webp"
          type="image/webp"
        >
        <img
          :src="projectInfoBackground.jpg"
          alt=""
        >
      </picture>
    </section>
  </div>
</template>

<script>
import heroImageS from '../images/code-s.jpg';
import heroImageM from '../images/code-m.jpg';
import heroImageWebpS from '../images/code-s.webp';
import heroImageWebpM from '../images/code-m.webp';
import projectInfoBackgroundS from '../images/glasses-s.jpg';
import projectInfoBackgroundWebpS from '../images/glasses-s.webp';

export default {
  name: 'Home',

  data: () => ({
    heroImage: {
      jpg: {
        s: heroImageS,
        m: heroImageM,
      },
      webp: {
        s: heroImageWebpS,
        m: heroImageWebpM,
      },
    },
    projectInfoBackground: {
      jpg: projectInfoBackgroundS,
      webp: projectInfoBackgroundWebpS,
    },
  }),
};
</script>
