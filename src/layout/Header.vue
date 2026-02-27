<template>
  <header class="sticky top-0 z-1100 bg-white">
    <div class="lg:flex lg:flex-wrap lg:items-center h-32 lg:h-24  max-w-6xl mx-auto px-6">
      <h1 class="w-2xs py-3 text-white text-shadow font-bold text-xl">
        <RouterLink to="/">
          国見 海・人・暮らし相談室
          <br>ダッシュボード
        </RouterLink>
      </h1>
      <nav class="flex flex-wrap w-1/1 max-w-xl mx-auto py-3 text-center">
        <RouterLink class="w-1/3 border-e" :to="{ path: '/', hash: '#tasks' }">進捗・タスク</RouterLink>
        <RouterLink class="w-1/3 border-e" :to="{ path: '/', hash: '#map' }">空き家マップ</RouterLink>
        <RouterLink class="w-1/3" :to="{ path: '/', hash: '#logs' }">議事録</RouterLink>
      </nav>
    </div>
  </header>
</template>
