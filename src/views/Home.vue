<template>
  <div id="home">
    <div class="home-item">
      <j-form ref="ruleForm" :model="model" :rules="rules">
        <j-form-item label="姓名" prop="name">
          <j-input v-model="model.name" placeholder="请输入姓名" />
        </j-form-item>
        <j-form-item label="年龄" prop="age">
          <j-input v-model="model.age" placeholder="请输入年龄" />
        </j-form-item>
      </j-form>
    </div>
    <div class="home-item">
      <j-carousel :dataList="dataSource" />
    </div>
    <div class="home-item">
      <j-tree :model="treeData" />
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      model: {
        name: '',
        age: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        age: [
          { required: true, message: '请填写年龄', trigger: 'change' },
          { min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'change' }
        ]
      },
      dataSource: [
        'PM:2.5 u/g', 'CO2:30 m3/e', '湿度:30 d/m3'
      ],
      treeData: {
        title: '地球',
        children: [
          {
            title: '人'
          },
          {
            title: '水果',
            children: [
              {
                title: '橘子'
              },
              {
                title: '苹果'
              }
            ]
          },
          {
            title: '植物',
            children: [
              {
                title: '四君子',
                expand: true,
                children: [
                  {
                    title: '梅'
                  },
                  {
                    title: '兰'
                  },
                  {
                    title: '竹'
                  }
                ]
              },
              {
                title: '动物',
                children: [
                  {
                    title: '猪🐷'
                  },
                  {
                    title: '狗'
                  }
                ]
              },
              {
                title: '气体',
                children: [
                  {
                    title: '空气',
                    children: [
                      {
                        title: '氧气'
                      }]
                  }]
              }
            ]
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
#home {
  height: 100%;
  width: 100%;
  display: flex;
  // background-color: aquamarine;
  .home-item {
    width: 20%;
    height: 160px;
    border: solid 1px black;
    padding: 20px 20px 20px 20px;
    overflow-y: auto;
  }
}
</style>
