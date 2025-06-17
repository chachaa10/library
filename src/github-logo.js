const githubLogo = document.querySelector('.github-logo');

if (matchMedia('(prefers-color-scheme: dark)').matches) {
  githubLogo.src = '';
  githubLogo.src = 'public/GitHub_dark.svg';
} else if (matchMedia('(prefers-color-scheme: light)').matches) {
  githubLogo.src = '';
  githubLogo.src = 'public/GitHub_light.svg';
}
