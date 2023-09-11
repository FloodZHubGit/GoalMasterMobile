<script lang="ts">
  import { onMount } from "svelte";
  import { fetchMatchs } from "~/shared/listService";
  import { Template } from "svelte-native/components";
  import { userStore } from "~/shared/store";
  import { navigate } from "svelte-native";
  import MatchInfo from "./MatchInfo.svelte";
  import Profile from "./Profile.svelte";

  let matchs: any[] = [];
  let user: any = {};

  let selectedTab: number = 0;

  onMount(async () => {
    matchs = await fetchMatchs();
    userStore.subscribe((userStore) => {
      user = userStore;
    });
  });

  function onMatchTap(args: any) {
    const tappedMatch = matchs[args.index];
    navigate({ page: MatchInfo, props: { tappedMatch } });
  }
</script>

<page>
  <actionBar title="Matchs" />
  <flexboxLayout flexDirection="column">
    <!-- button Voir mon profil -->
    <button
      on:tap={() => navigate({ page: Profile, props: { userId: user.id } })}
      >Voir mon profil</button
    >
    <listView items={matchs} on:itemTap={onMatchTap} class="list-group">
      <Template let:item>
        <label text={item.blue1.username} class="list-group-item team blue" />
        {#if item.blue2 != null}
          <label text={item.blue2.username} class="list-group-item team blue" />
        {/if}
        <label text={item.red1.username} class="list-group-item team red" />
        {#if item.red2 != null}
          <label text={item.red2.username} class="list-group-item team red" />
        {/if}
        <label class="list-group-item">{item.blueScore} - {item.redScore}</label
        >
        {#if item.hasEnded}
          <label text="Match terminé" class="list-group-item ended" />
        {:else}
          <label text="Match en cours" class="list-group-item ended" />
        {/if}
      </Template>
    </listView>
  </flexboxLayout>
</page>

<style>
  .list-group {
    margin: 0;
    padding: 0;
  }
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 0;
    border-bottom: 1px solid #ccc;
  }
  .list-group-item:last-child {
    border-bottom: none;
  }
  .team {
    font-weight: bold;
  }
  .score {
    margin-left: 10px;
    margin-right: 10px;
    font-weight: bold;
  }
  .blue {
    color: blue;
  }
  .red {
    color: red;
  }
  .ended {
    color: #ccc;
  }
  .created-at,
  .updated-at {
    font-size: 12px;
    color: #999;
  }
</style>
