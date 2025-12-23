<template>
    <el-tabs tab-position="left" class="demo-tabs">
        <el-tab-pane label="Noveaux">
            Creation
        </el-tab-pane>
        <el-tab-pane label="Modifier">
            Modifier
        </el-tab-pane>
    </el-tabs>
</template>
<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>