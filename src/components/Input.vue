<template>
    <div>
        <input type="text" :value="value" @input="updateValue($event.target.value)"/>
    </div> 
</template>
<script>    
export default {    
  props:['value'],
  methods:{
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function (value) {
      var formattedValue = value
        // 删除两侧的空格符
        .trim()
        // 保留 2 小数位
        .slice(
          0,
          value.indexOf('.') === -1
            ? value.length
            : value.indexOf('.') + 3
        )
      // 如果值不统一，
      // 手动覆盖以保持一致
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过 input 事件发出数值
      this.$emit('input', Number(formattedValue))
    }
  }
}
</script>

