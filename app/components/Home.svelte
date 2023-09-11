<script lang="ts">
  import { onMount } from "svelte";
  import { login, register } from "~/shared/listService";
  import { Template } from "svelte-native/components";
  import { userStore } from "~/shared/store";
  import { navigate } from "svelte-native";
  import Matchs from "./Matchs.svelte";

  let email: string = "";
  let password: string = "";
  let username: string = "";
  let isLoggingIn: boolean = true;
  let response: any = {};

  function toggleDisplay() {
    isLoggingIn = !isLoggingIn;
  }

  async function submit() {
    if (isLoggingIn) {
      await connexion();
    } else {
      await inscription();
    }
  }

  async function connexion() {
    let user = {
      email: email,
      password: password,
    };

    let res = await login(user);
    response = res;
    if (response.status == 200) {
      navigate({ page: Matchs });
    } else {
      alert(response.message);
    }
  }

  async function inscription() {
    let user = {
      email: email,
      password: password,
      username: username,
    };
    let res = await register(user);
    response = res;
    if (response.status == 201) {
      alert("Inscription réussie");
    } else {
      alert(response.reason);
    }
  }
</script>

<page actionBarHidden={true}>
  <flexboxLayout>
    <stackLayout class="form">
      {#if isLoggingIn}
        <label text="Connexion" class="h2" />
      {/if}

      {#if !isLoggingIn}
        <label text="Inscription" class="h2" />
        <textField
          hint="Nom d'utilisateur"
          bind:text={username}
          autocorrect="false"
          autocapitalizationType="none"
          class="input input-border"
        />
      {/if}
      <textField
        hint="Email"
        bind:text={email}
        keyboardType="email"
        autocorrect="false"
        autocapitalizationType="none"
        class="input input-border"
      />
      <textField
        hint="Mot de passe"
        secure="true"
        bind:text={password}
        class="input input-border"
      />

      <button
        text={isLoggingIn ? "Se connecter" : "S'inscrire"}
        class="btn btn-primary"
        on:tap={submit}
      />
      <button
        text={isLoggingIn ? "S'inscrire" : "Retour vers se connecter"}
        on:tap={toggleDisplay}
      />
    </stackLayout>
  </flexboxLayout>
</page>

<style>
  FlexboxLayout {
    justify-content: center;
    align-items: center;
  }

  StackLayout {
    width: 300;
    padding: 10 16;
    background-color: #f0f0f0;
  }

  Image {
    margin-bottom: 20;
    height: 70;
  }

  Button,
  TextField {
    margin-bottom: 10;
  }

  .btn-primary {
    background-color: #29cb00;
    color: white;
    margin-left: 0;
    margin-right: 0;
  }

  TextField {
    placeholder-color: #c4afb4;
    color: black;
  }

  .dark {
    background-color: #301217;
  }

  .dark TextField {
    color: #c4afb4;
  }

  .h2 {
    color: #301217;
    font-size: 20;
    /* center */
    text-align: center;
  }
</style>
