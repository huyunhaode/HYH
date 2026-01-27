# 这是一个简单的 R 语言示例程序
# 它可以帮助你验证 R 环境是否配置成功

# 1. 打印欢迎信息
print("Hello, R World! 欢迎来到 R 语言的世界！")

# 2. 创建一个简单的数据框 (Data Frame)
# 模拟 5 个学生的成绩
data <- data.frame(
  Name = c("小明", "小红", "小刚", "小李", "小张"),
  Math = c(85, 92, 78, 90, 88),
  English = c(88, 85, 80, 92, 86)
)

# 3. 显示数据
print("学生成绩单：")
print(data)

# 4. 进行简单的统计分析
# 计算数学平均分
math_mean <- mean(data$Math)
print(paste("数学平均分是：", math_mean))

# 计算英语平均分
english_mean <- mean(data$English)
print(paste("英语平均分是：", english_mean))

# 5. 简单的绘图 (保存为 PDF 文件)
# 在 Windows VS Code 中，如果安装了 httpgd，图表通常会显示在右侧窗口
# 这里为了通用性，我们将图表保存到文件中

pdf("scores_plot.pdf") # 开始记录绘图到 PDF
barplot(data$Math, 
        names.arg = data$Name, 
        col = "lightblue", 
        main = "学生数学成绩",
        xlab = "姓名",
        ylab = "分数")
dev.off() # 关闭绘图设备，保存文件

print("绘图已保存为 'scores_plot.pdf'")
