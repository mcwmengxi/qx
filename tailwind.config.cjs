/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // 移除生产环境下没有使用到的样式声明
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}
