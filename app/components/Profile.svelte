<script lang="ts">
  import { onMount } from "svelte";
  import { fetchUser } from "~/shared/listService";
  import { userStore } from "~/shared/store";

  export let userId: string = "";

  let user: any = {};

  let connectedUser: any = {};

  let winRate: number = 0;

  onMount(async () => {
    if (userId) {
      user = await fetchUser(userId);
    } else {
      userStore.subscribe((userStore) => {
        userId = userStore.id;
      });
      user = await fetchUser(userId);
    }

    userStore.subscribe((userStore) => {
      connectedUser = userStore;
    });

    winRate = Math.round((user.matchsWon / user.matchsPlayed) * 100);
  });

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("fr-fr");
  }
</script>

<page>
  <actionBar title="Profil de {user.username}" />
  <flexboxLayout flexDirection="column">
    <label>Nom d'utilisateur : {user.username}</label>
    {#if user.matchsPlayed == 0}
      <label>Ce joueur n'a pas encore joué de match</label>
    {:else}
      <label>Nombre de matchs joués : {user.matchsPlayed}</label>
      <label>Pourcentage de victoire : {winRate}%</label>
    {/if}
    <!-- Compte créé le -->
    <label>Compte créé le : {formatDate(user.createdAt)}</label>
  </flexboxLayout>
</page>
