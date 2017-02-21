<template>
    <div id="innerSlot">
        <h2>I'm Title</h2>
        <slot>
            I'll show when nothing in here.
        </slot>
    </div>
</template>

<script>
    export default{
        name:'innerSlot'
    }
</script>