<script setup lang="ts">
import UModalCustom from '~/components/01.ui/u-modal-custom'

const props = defineProps<{
  returnTo?: string
  title?: string
}>()

const isOpen = ref(true)
const router = useRouter()
const route = useRoute()

function handleClose() {
  isOpen.value = false

  setTimeout(() => {
    if (props.returnTo) {
      router.push(props.returnTo)
    }
    else {
      const parentPath = route.path.split('/').slice(0, -2).join('/') || '/'
      router.push(parentPath)
    }
  }, 300)
}
</script>

<template>
  <u-modal-custom
    v-model="isOpen"
    :title="title"
    @close="handleClose"
  >
    <slot />
  </u-modal-custom>
</template>
