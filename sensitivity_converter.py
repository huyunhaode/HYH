def main():
    print("=== 简单灵敏度转换器 ===")
    print("这个工具可以帮助你在不同游戏灵敏度之间进行转换，以 Source (CS:GO, Apex) 为基准。")
    
    print("\n请选择你的输入游戏:")
    print("1. Source (CS:GO, Apex Legends, Titanfall)")
    print("2. Overwatch")
    print("3. Valorant")
    
    try:
        choice = input("请输入选项 (1-3): ")
        sens = float(input("请输入你的灵敏度数值: "))
    except ValueError:
        print("输入无效，请输入数字。")
        return

    # Convert to Source (Base)
    source_sens = 0.0
    
    if choice == '1':
        source_sens = sens
    elif choice == '2': # Overwatch to Source
        source_sens = sens / (10/3)
    elif choice == '3': # Valorant to Source
        source_sens = sens * 3.181818
    else:
        print("无效的选项。")
        return

    print(f"\n--- 转换结果 (基准: Source/KovaaK's default) ---")
    print(f"Source / Apex / CS:GO: {source_sens:.4f}")
    print(f"Overwatch:             {source_sens * (10/3):.4f}")
    print(f"Valorant:              {source_sens / 3.181818:.4f}")
    
    print("\n在 KovaaK's 中，你可以选择 'Sensitivity Scale' 为 'Source' 并填入上面的 Source 数值，")
    print("或者直接选择对应的游戏 Scale 并填入你原本的数值。")

if __name__ == "__main__":
    main()
