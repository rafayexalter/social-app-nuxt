<template>
  <div class="pt-5 space-y-6">
    <UIInput label="Username" placeholder="@username" v-model="data.username" />
    <UIInput
      label="Password"
      placeholder="*********"
      type="password"
      v-model="data.password"
    />
    <div>
      <button @click="handleLogin">Login</button>
    </div>
  </div>
</template>
<script setup>
// Save/Update fields data
const data = reactive({
  username: "",
  password: "",
  loading: false,
});
async function handleLogin() {
  /**
   * useAuth() is a composable that will send data to api and use helper methods, returns back response
   */
  const { login } = useAuth();
  data.loading = true;

  try {
    await login({ username: data.username, password: data.password });
  } catch (error) {
    console.log(error);
  } finally {
    data.loading = false;
  }

  data.loading = false;
}
</script>
