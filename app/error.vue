<template>
  <u-app>
    <u-main>
      <u-error
        redirect="/"
        :error="{
          statusCode: 404,
          statusMessage: 'Page not found',
          message: 'The page you are looking for does not exist.',
        }"
      />
    </u-main>
  </u-app>
</template>
