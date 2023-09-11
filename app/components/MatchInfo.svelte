<script lang="ts">
  import { onMount } from "svelte";
  import { fetchMatch, fetchMatchs } from "~/shared/listService";
  import { Template } from "svelte-native/components";
  import { userStore } from "~/shared/store";
  import { navigate } from "svelte-native";
  import Profile from "./Profile.svelte";

  export let tappedMatch: any = {};

  let user: any = {};

  onMount(async () => {
    userStore.subscribe((userStore) => {
      user = userStore;
    });

    tappedMatch = await fetchMatch(tappedMatch.id);
  });

  setInterval(async () => {
    tappedMatch = await fetchMatch(tappedMatch.id);
  }, 10000);

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("fr-fr");
  }

  function showProfile(user: any) {
    let userId = user.id;
    navigate({ page: Profile, props: { userId } });
  }
</script>

<page>
  <actionBar title="Match Info" />

  <gridLayout columns="*, auto, *, auto, *" rows="auto, auto, auto, auto, auto">
    <label
      class="team-blue"
      text={tappedMatch.blue1.username}
      row="0"
      col="0"
      on:tap={() => {
        showProfile(tappedMatch.blue1);
      }}
    />
    <label
      class="team-blue"
      text={tappedMatch.blue2 ? " & " + tappedMatch.blue2.username : ""}
      row="0"
      col="1"
      on:tap={() => {
        showProfile(tappedMatch.blue2);
      }}
    />

    <label text="vs" row="0" col="2" horizontalAlignment="center" colSpan="1" />

    <label
      class="team-red"
      text={tappedMatch.red1.username}
      row="0"
      col="3"
      on:tap={() => {
        showProfile(tappedMatch.red1);
      }}
    />
    <label
      class="team-red"
      text={tappedMatch.red2 ? " & " + tappedMatch.red2.username : ""}
      row="0"
      col="4"
      on:tap={() => {
        showProfile(tappedMatch.red2);
      }}
    />

    <label
      class="scores"
      text={tappedMatch.blueScore + " - " + tappedMatch.redScore}
      row="1"
      col="0"
      colSpan="5"
      horizontalAlignment="center"
    />

    <label
      class="status-text"
      text={tappedMatch.hasEnded ? "Match Terminé" : "Match en cours"}
      row="2"
      col="0"
      colSpan="5"
      horizontalAlignment="center"
    />

    <label
      class="created-at"
      text={"Créé le " + formatDate(tappedMatch.createdAt)}
      row="3"
      col="0"
      colSpan="5"
      horizontalAlignment="center"
    />
  </gridLayout>
</page>

<style scoped>
  .team-blue {
    color: blue;
  }

  .team-red {
    color: red;
  }

  .blue {
    color: blue;
  }

  .red {
    color: red;
  }

  .vs {
    font-weight: bold;
    font-size: 20;
    vertical-align: middle;
    margin: 10;
  }

  .scores {
    padding: 10;
    vertical-align: middle;
  }

  .score {
    font-weight: bold;
    margin: 10;
  }

  .status {
    text-align: center;
    margin-top: 20;
  }

  .status-text {
    color: #5bc0de;
  }

  .status-text::after {
    content: " • ";
    margin: 0 5px;
  }

  .created-at {
    font-style: italic;
    color: #999;
  }
</style>
