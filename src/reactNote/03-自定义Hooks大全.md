# 第三部分：自定义 Hooks 大全

## 自定义 Hooks 设计原则

- ✅ 命名规范：use 开头
- ✅ 复用逻辑而非 UI
- ✅ 遵循 Hooks 规则
- ✅ 单一职责
- ✅ 返回值清晰

---

## 第10章：数据获取类

### 10.1 useRequest / useFetch ⭐

> 📄 **详细内容**：[10.1-useRequest.md](./自定义Hooks大全/10.1-useRequest.md)

- [x] **实现思路**：封装 fetch + loading/error/data 状态
- [x] **完整实现**
  - loading：加载状态
  - error：错误信息
  - data：响应数据
  - retry：重试函数
  - cancel：取消请求
- [x] **高级特性**
  - 缓存
  - 防抖/节流
  - 轮询
  - 依赖刷新
- [x] **常见问题**：状态管理、错误处理、取消请求

### 10.2 useSWR 💡

> 📄 **详细内容**：[10.2-useSWR.md](./自定义Hooks大全/10.2-useSWR.md)

- [x] **实现思路**：stale-while-revalidate 策略
- [x] **完整实现**
  - 缓存：内存缓存
  - 自动重新验证：focus/reconnect/interval
  - 去重：相同请求合并
  - 乐观更新
- [x] **常见问题**：SWR 策略、vs useRequest

### 10.3 useInfiniteScroll ⭐

> 📄 **详细内容**：[10.3-useInfiniteScroll.md](./自定义Hooks大全/10.3-useInfiniteScroll.md)

- [x] **实现思路**：IntersectionObserver + 分页加载
- [x] **完整实现**
  - 滚动监听
  - hasMore：是否还有更多数据
  - loadMore：加载更多函数
  - loading：加载状态
- [x] **常见问题**：IntersectionObserver、性能优化

---

## 第11章：状态管理类

### 11.1 useLocalStorage ⭐

> 📄 **详细内容**：[11.1-useLocalStorage.md](./自定义Hooks大全/11.1-useLocalStorage.md)

- [x] **实现思路**：localStorage + useState 同步
- [x] **完整实现**
  - 序列化：JSON.stringify/parse
  - storage 事件监听：多标签页同步
  - SSR 兼容：typeof window !== 'undefined'
  - 错误处理
- [x] **常见问题**：多标签页同步、SSR

### 11.2 useSessionStorage ⭐

> 📄 **详细内容**：[11.2-useSessionStorage.md](./自定义Hooks大全/11.2-useSessionStorage.md)

- [x] **实现思路**：类似 useLocalStorage
- [x] **完整实现**：sessionStorage 封装
- [x] **vs useLocalStorage**：会话级 vs 持久化

### 11.3 useToggle ⭐

> 📄 **详细内容**：[11.3-useToggle.md](./自定义Hooks大全/11.3-useToggle.md)

- [x] **实现思路**：布尔值切换
- [x] **完整实现**
  - toggle：切换
  - setTrue：设为 true
  - setFalse：设为 false
  - setValue：设置任意值
- [x] **使用场景**：Modal 开关、Checkbox

### 11.4 useCounter ⭐

> 📄 **详细内容**：[11.4-useCounter.md](./自定义Hooks大全/11.4-useCounter.md)

- [x] **实现思路**：计数器操作封装
- [x] **完整实现**
  - increment：加 1
  - decrement：减 1
  - reset：重置
  - set：设置值
- [x] **使用场景**：计数、分页

### 11.5 useArray ⭐

> 📄 **详细内容**：[11.5-useArray.md](./自定义Hooks大全/11.5-useArray.md)

- [x] **实现思路**：数组操作封装
- [x] **完整实现**
  - push：添加元素
  - filter：过滤
  - update：更新指定索引
  - remove：删除指定索引
  - clear：清空
- [x] **常见问题**：不可变更新

### 11.6 useMap / useSet ⭐

> 📄 **详细内容**：[11.6-useMapSet.md](./自定义Hooks大全/11.6-useMapSet.md)

- [x] **实现思路**：Map/Set 操作封装
- [x] **完整实现**
  - set/add：添加
  - get：获取
  - remove/delete：删除
  - clear：清空
  - 触发重渲染
- [x] **常见问题**：响应式 Map/Set

---

## 第12章：副作用类

### 12.1 useDebounce ⭐

> 📄 **详细内容**：[12.1-useDebounce.md](./自定义Hooks大全/12.1-useDebounce.md)

- [x] **实现思路**：延迟更新值
- [x] **完整实现**
  - setTimeout + 清理
  - delay 参数
- [x] **使用场景**：搜索输入、窗口 resize
- [x] **常见问题**：防抖原理、vs useThrottle

### 12.2 useThrottle ⭐

> 📄 **详细内容**：[12.2-useThrottle.md](./自定义Hooks大全/12.2-useThrottle.md)

- [x] **实现思路**：限制更新频率
- [x] **完整实现**
  - 时间戳方案
  - 定时器方案
  - 首次立即执行
- [x] **使用场景**：滚动事件、按钮点击
- [x] **常见问题**：节流原理、vs useDebounce

### 12.3 useInterval ⭐

> 📄 **详细内容**：[12.3-useInterval.md](./自定义Hooks大全/12.3-useInterval.md)

- [x] **实现思路**：声明式定时器
- [x] **完整实现**
  - 自动清理
  - 动态延迟
  - 暂停/恢复
- [x] **常见问题**：闭包陷阱、清理函数

### 12.4 useTimeout ⭐

> 📄 **详细内容**：[12.4-useTimeout.md](./自定义Hooks大全/12.4-useTimeout.md)

- [x] **实现思路**：声明式延时
- [x] **完整实现**
  - 自动清理
  - 重置函数
- [x] **使用场景**：延迟操作、自动关闭提示

### 12.5 useEventListener ⭐

> 📄 **详细内容**：[12.5-useEventListener.md](./自定义Hooks大全/12.5-useEventListener.md)

- [x] **实现思路**：事件监听封装
- [x] **完整实现**
  - 自动添加/移除监听器
  - 支持 window/document/element
  - options 参数
- [x] **使用场景**：全局事件监听
- [x] **常见问题**：清理函数、内存泄漏

### 12.6 useClickOutside ⭐

> 📄 **详细内容**：[12.6-useClickOutside.md](./自定义Hooks大全/12.6-useClickOutside.md)

- [x] **实现思路**：检测外部点击
- [x] **完整实现**
  - ref + mousedown/touchstart
  - contains 判断
- [x] **使用场景**：Dropdown、Modal 关闭
- [x] **常见问题**：事件委托、性能

### 12.7 useKeyPress ⭐

> 📄 **详细内容**：[12.7-useKeyPress.md](./自定义Hooks大全/12.7-useKeyPress.md)

- [x] **实现思路**：键盘事件监听
- [x] **完整实现**
  - 支持单键
  - 支持组合键（Ctrl+K）
  - keydown/keyup
- [x] **使用场景**：快捷键、游戏控制

---

## 第13章：DOM/BOM 类

### 13.1 useWindowSize ⭐

> 📄 **详细内容**：[13.1-useWindowSize.md](./自定义Hooks大全/13.1-useWindowSize.md)

- [x] **实现思路**：监听 resize 事件
- [x] **完整实现**
  - 防抖优化
  - width/height
  - SSR 兼容
- [x] **使用场景**：响应式布局

### 13.2 useMediaQuery ⭐

> 📄 **详细内容**：[13.2-useMediaQuery.md](./自定义Hooks大全/13.2-useMediaQuery.md)

- [x] **实现思路**：matchMedia API
- [x] **完整实现**
  - 响应式媒体查询
  - change 事件监听
- [x] **使用场景**：响应式组件、主题切换

### 13.3 useScroll ⭐

> 📄 **详细内容**：[13.3-useScroll.md](./自定义Hooks大全/13.3-useScroll.md)

- [x] **实现思路**：监听 scroll 事件
- [x] **完整实现**
  - 节流优化
  - 滚动方向
  - x/y 位置
- [x] **使用场景**：无限滚动、返回顶部

### 13.4 useHover ⭐

> 📄 **详细内容**：[13.4-useHover.md](./自定义Hooks大全/13.4-useHover.md)

- [x] **实现思路**：mouseenter/mouseleave
- [x] **完整实现**：返回 [ref, isHovered]
- [x] **使用场景**：悬停效果、Tooltip

### 13.5 useFocus ⭐

> 📄 **详细内容**：[13.5-useFocus.md](./自定义Hooks大全/13.5-useFocus.md)

- [x] **实现思路**：focus/blur 事件
- [x] **完整实现**：焦点状态管理
- [x] **使用场景**：表单验证、自动聚焦

### 13.6 useIntersectionObserver ⭐

> 📄 **详细内容**：[13.6-useIntersectionObserver.md](./自定义Hooks大全/13.6-useIntersectionObserver.md)

- [x] **实现思路**：IntersectionObserver API
- [x] **完整实现**
  - 元素可见性检测
  - threshold 配置
  - rootMargin 配置
- [x] **使用场景**：懒加载、曝光埋点

### 13.7 useMutationObserver 💡

> 📄 **详细内容**：[13.7-useMutationObserver.md](./自定义Hooks大全/13.7-useMutationObserver.md)

- [x] **实现思路**：MutationObserver API
- [x] **完整实现**：DOM 变化监听
- [x] **使用场景**：DOM 监控、第三方库集成

### 13.8 useCopyToClipboard ⭐

> 📄 **详细内容**：[13.8-useCopyToClipboard.md](./自定义Hooks大全/13.8-useCopyToClipboard.md)

- [x] **实现思路**：Clipboard API
- [x] **完整实现**
  - navigator.clipboard.writeText
  - 降级方案：document.execCommand
  - 成功/失败状态
- [x] **使用场景**：复制按钮

---

## 第14章：性能优化类

### 14.1 useWhyDidYouUpdate 💡

> 📄 **详细内容**：[14.1-useWhyDidYouUpdate.md](./自定义Hooks大全/14.1-useWhyDidYouUpdate.md)

- [x] **实现思路**：对比前后 props
- [x] **完整实现**
  - 追踪变化原因
  - console.log 输出
- [x] **使用场景**：性能调试

### 14.2 useRenderCount 💡

> 📄 **详细内容**：[14.2-useRenderCount.md](./自定义Hooks大全/14.2-useRenderCount.md)

- [x] **实现思路**：useRef 计数
- [x] **完整实现**：统计渲染次数
- [x] **使用场景**：性能分析

### 14.3 usePrevious ⭐

> 📄 **详细内容**：[14.3-usePrevious.md](./自定义Hooks大全/14.3-usePrevious.md)

- [x] **实现思路**：useRef + useEffect
- [x] **完整实现**：保存上一次的值
- [x] **使用场景**：对比前后值、动画

---

## 第15章：表单处理类

### 15.1 useForm ⭐

> 📄 **详细内容**：[15.1-useForm.md](./自定义Hooks大全/15.1-useForm.md)

- [x] **实现思路**：表单状态管理
- [x] **完整实现**
  - values：表单值
  - errors：错误信息
  - touched：是否被触摸
  - handleChange：处理变化
  - handleBlur：处理失焦
  - handleSubmit：处理提交
  - validation：验证规则
- [x] **常见问题**：表单验证、性能优化

### 15.2 useField ⭐

> 📄 **详细内容**：[15.2-useField.md](./自定义Hooks大全/15.2-useField.md)

- [x] **实现思路**：单个字段管理
- [x] **完整实现**
  - value：字段值
  - onChange：变化处理
  - onBlur：失焦处理
  - error：错误信息
- [x] **使用场景**：配合 useForm

### 15.3 useValidation ⭐

> 📄 **详细内容**：[15.3-useValidation.md](./自定义Hooks大全/15.3-useValidation.md)

- [x] **实现思路**：表单验证规则引擎
- [x] **完整实现**
  - required：必填
  - pattern：正则
  - min/max：范围
  - custom：自定义规则
- [x] **常见问题**：验证策略、异步验证

---

## 第16章：动画类

### 16.1 useAnimation 💡

> 📄 **详细内容**：[16.1-useAnimation.md](./自定义Hooks大全/16.1-useAnimation.md)

- [x] **实现思路**：requestAnimationFrame 封装
- [x] **完整实现**
  - 动画循环
  - 自动清理
  - 暂停/恢复
- [x] **使用场景**：自定义动画

### 16.2 useSpring 💡

> 📄 **详细内容**：[16.2-useSpring.md](./自定义Hooks大全/16.2-useSpring.md)

- [x] **实现思路**：弹簧动画物理模拟
- [x] **完整实现**
  - 插值计算
  - 缓动函数
- [x] **使用场景**：平滑动画

---

## 第17章：其他实用类

### 17.1 useAsync ⭐

> 📄 **详细内容**：[17.1-useAsync.md](./自定义Hooks大全/17.1-useAsync.md)

- [x] **实现思路**：异步操作状态管理
- [x] **完整实现**
  - execute：执行函数
  - loading：加载状态
  - error：错误信息
  - data：结果数据
- [x] **使用场景**：异步操作封装

### 17.2 useMount / useUnmount ⭐

> 📄 **详细内容**：[17.2-useMount.md](./自定义Hooks大全/17.2-useMount.md)

- [x] **实现思路**：组件挂载/卸载回调
- [x] **完整实现**：useEffect 封装
- [x] **使用场景**：初始化、清理

### 17.3 useUpdateEffect ⭐

> 📄 **详细内容**：[17.3-useUpdateEffect.md](./自定义Hooks大全/17.3-useUpdateEffect.md)

- [x] **实现思路**：跳过首次渲染的 useEffect
- [x] **完整实现**：useRef 标记首次
- [x] **使用场景**：仅在更新时执行

### 17.4 useIsomorphicLayoutEffect ⭐

> 📄 **详细内容**：[17.4-useIsomorphicLayoutEffect.md](./自定义Hooks大全/17.4-useIsomorphicLayoutEffect.md)

- [x] **实现思路**：SSR 兼容的 useLayoutEffect
- [x] **完整实现**：环境判断
- [x] **使用场景**：同构应用

### 17.5 useLatest ⭐

> 📄 **详细内容**：[17.5-useLatest.md](./自定义Hooks大全/17.5-useLatest.md)

- [x] **实现思路**：始终获取最新值
- [x] **完整实现**：useRef 存储
- [x] **使用场景**：避免闭包陷阱

### 17.6 useMemoizedFn ⭐

> 📄 **详细内容**：[17.6-useMemoizedFn.md](./自定义Hooks大全/17.6-useMemoizedFn.md)

- [x] **实现思路**：持久化函数引用
- [x] **完整实现**：useRef + useCallback
- [x] **使用场景**：避免依赖变化
