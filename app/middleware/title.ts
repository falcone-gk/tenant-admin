export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.includes("/admin")) {
    const title = useState("title");
    title.value = to.meta.title;
  }
});
