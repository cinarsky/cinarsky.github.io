<template>
  <el-container id="resume">
    <el-header>
      <el-header>
        <h2>个人简历</h2>
      </el-header>
    </el-header>
    <hr>
    <el-main>
      <ul>
        <li>
          <h3>基本信息：</h3>
          <p>姓名：胡重庆 性别：男</p>
          <p>学历：本科 2018年 毕业于 北京服装学院</p>
          <p>沟通能力良好，能配合团队合作，并完成自己的本职工作</p>
          <p>使用 Vue + ElementUI + Node.js（express）+ sqlite实现了一个扫码点餐及管理系统</p>
          <p>技术栈和工具：Vue Node.js express sqlite webpack scss bootstrap element-ui mint-ui</p>
        </li>
        <hr>
        <li>
          <h3>技能树</h3>
            <h4>前端工程化</h4>
              <p>熟练使用Vue框架，熟悉前端框架开发模式，对一些虚拟dom和Vue的双向绑定等原理有一定了解</p>
              <p>熟悉Node.js，用express框架写了一个无人点餐系统的后台</p>
              <p>具备基本的Web安全知识(XSS/CSRF及其防护等等)</p>
              <p>熟练使用DevTool进行开发和调试并解决问题</p>
              <p>能够使用Git进行版本控制</p>
              <p>了解Webpack的原理，了解前端工程化工具</p>
              <hr>
            <h4>HTML/CSS/JS</h4>
              <p>通读《CSS权威指南》、《The Book Of CSS3》、《Eloquent JS》、《JS 高级程序设计》 、《DOM编程艺术》</p>
              <p>熟练掌握盒模型，行内及块级格式化</p>
              <p>熟练掌握CSS3的渐变，动画，2D/3D变换</p>
              <p>熟悉Less/Scss，熟悉Bootstrap</p>
              <p>熟悉原生JS，理解原型、闭包、高阶、异步，刷了一部分(约1/4左右)Lodash函数</p>
              <p>熟悉ES6新特性，包括但不限于新的语法糖、类、promise、async/await、解构语法、Symbol类型、箭头函数</p>
              <p>熟悉DOM及其原生API，了解事件流</p>
              <p>了解Node.js，了解其常用模块，了解JS事件循环机制（EventLoop）；熟悉Express框架，了解其中间件的机制</p>
              <p>熟悉Vue的使用，对Vue的部分原理，Vue的生命周期函数，熟悉前端框架开发模式，对虚拟dom和Vue的双向绑定等原理有一定了解。</p>
            <h4>计算机基础</h4>
              <p>了解基本的数据结构，链表、二叉树、BST、堆</p>
              <p>能实现基本的排序算法如：快排、归并</p>
              <p>理解计算机网络基本原理及分层模型，熟悉HTTP协议的机制、常见首部及缓存方式</p>
              <p>了解跨域及其常见方式，以及跨域相关的安全问题（XSS, CSRF）</p>
              <p>了解基本的数据库及简单SQL语言的使用</p>
              <p>平时带着刷了一些leetcode,<a href="https://leetcode.com/hucq88/" style="font-weight:bold;">我的leetcode主页</a></p>
        </li>
        <hr>
        <li>
          <h3>项目经验</h3>
           <h4> 扫码点餐系统和餐厅管理</h4>
           <p>前端Vue全家桶 + elementUI + vue-socket</p>
           <p>后端Node.js实现，使用了 express + sqlite + socket.io</p>
           <p>点餐部分适配的是手机端，商家餐厅管理适配的是PC端</p>
           <p>功能：</p>
           <p>商户侧：验证码登录 邮箱找回密码 添加菜品、桌面，实时同步及修改管理 菜品、桌面、订单信息</p>
           <p>顾客侧：扫码点餐， 同桌客户点餐的实时同步， 订单状态与后台的实时同步，购物车实时更新，查看自己正在进行中的订单状态</p>
           <h3><a href="http://47.96.148.104/#/login">商户侧(请点击)</a></h3>
           <h3>顾客侧:(请扫码)<img src="http://47.96.148.104/QR" alt="顾客侧"></h3>

           <h4> 纯CSS仿小米首页</h4>
            <p>无框架，无js，纯CSS写的，首屏略复杂，主要精力用在了slider上和hover切换选项卡 </p>
            <p><a href="http://47.96.148.104/mi">在线地址</a></p>

            <h4>纯CSS实现百叶窗slider</h4>
            <p>百叶窗silder: <a href="http://47.96.148.104/slider">在线地址</a></p>
        </li>
        <hr>
        <li>
          <h3> 联系方式：</h3>
            <p> QQ: 810006338</p>
            <p> 邮箱：810006338@qq.com</p>
            <p> 电话：18811018100</p>
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
#resume{
  width:850px;
  margin:auto;
}
</style>

<script>
export default {
  name: 'Resume',
};
</script>
