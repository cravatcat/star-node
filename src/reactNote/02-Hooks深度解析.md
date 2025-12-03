# 第二部分：Hooks 深度解析

## 第4章：状态管理 Hooks

### 4.1 useState 🌟

> 📄 **详细内容**：[4.1-useState.md](./Hooks深度解析/4.1-useState.md)

- [x] **原理讲解**
  - 实现思路：闭包 + 数组存储状态（hooks 链表）
  - 模拟实现：手写 useState（currentIndex + states 数组）
- [x] **批量更新机制**
  - 实现思路：事件循环、批处理队列、isBatchingUpdates
  - 模拟实现：批量更新调度器
- [x] **函数式更新**
  - 实现思路：setState(prev => prev + 1) 获取最新值
  - 模拟实现：支持函数参数的 useState
- [x] **常见问题**：闭包陷阱、批量更新、React 18 自动批处理

### 4.2 useReducer 🌟

> 📄 **详细内容**：[4.2-useReducer.md](./Hooks深度解析/4.2-useReducer.md)

- [x] **原理讲解**
  - 实现思路：(state, action) => newState + dispatch
  - 模拟实现：手写 useReducer
- [x] **与 useState 关系**
  - 实现思路：useState 是简化的 useReducer
  - 模拟实现：用 useReducer 实现 useState
- [x] **使用场景**：复杂状态逻辑、多个子值、下一个 state 依赖前一个
- [x] **常见问题**：vs useState、vs Redux

### 4.3 useImmer 💡

> 📄 **详细内容**：[4.3-useImmer.md](./Hooks深度解析/4.3-useImmer.md)

- [x] **Immer 原理**
  - 实现思路：Proxy 拦截 + 结构共享
  - 模拟实现：简易 Immer（produce 函数）
- [x] **useImmer 实现**
  - 实现思路：useState + produce
  - 模拟实现：手写 useImmer
- [x] **常见问题**：不可变数据、Proxy、性能优化

### 4.4 useContext 🌟

> 📄 **详细内容**：[4.4-useContext.md](./Hooks深度解析/4.4-useContext.md)

- [x] **Context 原理**
  - 实现思路：Provider 提供值，Consumer/useContext 消费
  - 模拟实现：createContext + useContext
- [x] **Context 性能优化**
  - 拆分 Context：按功能拆分
  - useMemo：缓存 value
  - React.memo：避免不必要渲染
- [x] **常见问题**：vs props drilling、性能问题、何时使用

---

## 第5章：副作用 Hooks

### 5.1 useEffect 🌟

> 📄 **详细内容**：[5.1-useEffect.md](./Hooks深度解析/5.1-useEffect.md)

- [x] **原理讲解**
  - 实现思路：异步执行副作用 + 清理函数
  - 模拟实现：手写 useEffect（依赖对比 + 清理）
- [x] **依赖数组机制**
  - 实现思路：浅比较 Object.is(oldDep, newDep)
  - 模拟实现：依赖对比算法
- [x] **执行时机**：渲染完成后异步执行
- [x] **常见陷阱**
  - 闭包陷阱：useRef/useCallback 解决
  - 无限循环：依赖项设置错误
  - 清理函数：return cleanup
- [x] **常见问题**：vs componentDidMount、依赖数组、清理函数

### 5.2 useLayoutEffect ⭐

> 📄 **详细内容**：[5.2-useLayoutEffect.md](./Hooks深度解析/5.2-useLayoutEffect.md)

- [x] **原理讲解**
  - 实现思路：同步执行（DOM 更新后立即）
  - 模拟实现：手写 useLayoutEffect
- [x] **vs useEffect**
  - useEffect：异步，不阻塞渲染
  - useLayoutEffect：同步，阻塞渲染
- [x] **使用场景**：DOM 测量、避免闪烁、同步更新
- [x] **常见问题**：执行时机、何时使用

### 5.3 useInsertionEffect 💡

> 📄 **详细内容**：[5.3-useInsertionEffect.md](./Hooks深度解析/5.3-useInsertionEffect.md)

- [x] **原理讲解**
  - 实现思路：DOM 变更前执行，CSS-in-JS 专用
  - 模拟实现：手写 useInsertionEffect
- [x] **执行顺序**：useInsertionEffect → useLayoutEffect → useEffect
- [x] **使用场景**：CSS-in-JS 库（styled-components）
- [x] **常见问题**：为什么需要、vs useLayoutEffect

---

## 第6章：性能优化 Hooks

### 6.1 useMemo 🌟

> 📄 **详细内容**：[6.1-useMemo.md](./Hooks深度解析/6.1-useMemo.md)

- [x] **原理讲解**
  - 实现思路：缓存计算结果，依赖不变返回缓存
  - 模拟实现：手写 useMemo
- [x] **使用场景**
  - 昂贵计算
  - 引用类型稳定性
  - 子组件 props 优化
- [x] **注意事项**
  - 避免过度优化
  - 不要依赖 useMemo 做语义保证
- [x] **常见问题**：何时使用、vs useCallback

### 6.2 useCallback 🌟

> 📄 **详细内容**：[6.2-useCallback.md](./Hooks深度解析/6.2-useCallback.md)

- [x] **原理讲解**
  - 实现思路：缓存函数引用
  - 模拟实现：手写 useCallback
- [x] **与 useMemo 关系**
  - useCallback(fn, deps) === useMemo(() => fn, deps)
  - 模拟实现：用 useMemo 实现 useCallback
- [x] **使用场景**
  - 传递给子组件的回调
  - 作为其他 Hook 的依赖
- [x] **常见问题**：vs useMemo、何时使用

### 6.3 React.memo ⭐

> 📄 **详细内容**：[6.3-React.memo.md](./Hooks深度解析/6.3-React.memo.md)

- [x] **原理讲解**
  - 实现思路：浅比较 props，相同则跳过渲染
  - 模拟实现：手写 memo HOC
- [x] **自定义比较函数**
  - 第二个参数：(prevProps, nextProps) => boolean
- [x] **使用场景**：纯展示组件、props 变化少
- [x] **常见问题**：vs PureComponent、浅比较

### 6.4 React Compiler (自动优化) 🚀

> 📄 **详细内容**：[6.4-ReactCompiler.md](./Hooks深度解析/6.4-ReactCompiler.md)

- [x] **背景**：解决手动管理依赖的心智负担
- [x] **原理**：构建时自动分析 + 自动记忆化 (Automatic Memoization)
- [x] **效果**：实现类似“细粒度更新”的性能表现
- [x] **现状**：React 19+ 官方推荐，无需手动写 useMemo/useCallback

---

## 第7章：引用 Hooks

### 7.1 useRef 🌟

> 📄 **详细内容**：[7.1-useRef.md](./Hooks深度解析/7.1-useRef.md)

- [x] **原理讲解**
  - 实现思路：返回可变 ref 对象 {current}
  - 模拟实现：手写 useRef
- [x] **vs useState**
  - useRef：不触发重渲染
  - useState：触发重渲染
- [x] **使用场景**
  - DOM 引用
  - 保存可变值（定时器 ID、前一次的值）
  - 避免闭包陷阱
- [x] **常见问题**：为什么不触发渲染、使用场景

### 7.2 useImperativeHandle ⭐

> 📄 **详细内容**：[7.2-useImperativeHandle.md](./Hooks深度解析/7.2-useImperativeHandle.md)

- [x] **原理讲解**
  - 实现思路：自定义 ref 暴露的实例值
  - 模拟实现：手写 useImperativeHandle + forwardRef
- [x] **使用场景**：封装组件、暴露特定方法
- [x] **常见问题**：vs ref、何时使用

---

## 第8章：并发特性 Hooks

### 8.1 useTransition 🌟

> 📄 **详细内容**：[8.1-useTransition.md](./Hooks深度解析/8.1-useTransition.md)

- [x] **原理讲解**
  - 实现思路：标记低优先级更新，保持 UI 响应
  - 模拟实现：简易优先级调度
- [x] **API**
  - const [isPending, startTransition] = useTransition()
  - isPending：是否有待处理的 transition
  - startTransition：标记低优先级更新
- [x] **使用场景**
  - 大列表渲染
  - 路由切换
  - 搜索过滤
- [x] **常见问题**：并发渲染、优先级调度

### 8.2 useDeferredValue 🌟

> 📄 **详细内容**：[8.2-useDeferredValue.md](./Hooks深度解析/8.2-useDeferredValue.md)

- [x] **原理讲解**
  - 实现思路：延迟更新值，优先级降低
  - 模拟实现：手写 useDeferredValue
- [x] **vs useTransition**
  - useTransition：包裹更新逻辑
  - useDeferredValue：延迟值本身
- [x] **使用场景**
  - 搜索防抖
  - 大数据渲染
  - 输入框优化
- [x] **常见问题**：vs debounce、vs useTransition

### 8.3 useSyncExternalStore 🌟

> 📄 **详细内容**：[8.3-useSyncExternalStore.md](./Hooks深度解析/8.3-useSyncExternalStore.md)

- [x] **原理讲解**
  - 实现思路：订阅外部数据源，解决 tearing
  - 模拟实现：手写 useSyncExternalStore
- [x] **API**
  - useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
- [x] **解决的问题**：并发渲染下的 tearing（撕裂）
- [x] **使用场景**：状态管理库集成、订阅外部数据
- [x] **常见问题**：tearing 问题、vs useState

---

## 第9章：其他实用 Hooks

### 9.1 use (React 19) 💡

> 📄 **详细内容**：[9.1-use.md](./Hooks深度解析/9.1-use.md)

- [x] **原理讲解**
  - 实现思路：在渲染中读取 Promise/Context
  - 模拟实现：简易 use hook
- [x] **vs useEffect**
  - use：同步读取
  - useEffect：异步执行
- [x] **使用场景**：数据获取、Context 读取
- [x] **常见问题**：React 19 新特性

### 9.2 useId ⭐

> 📄 **详细内容**：[9.2-useId.md](./Hooks深度解析/9.2-useId.md)

- [x] **原理讲解**
  - 实现思路：生成稳定唯一 ID（SSR 一致）
  - 模拟实现：手写 useId
- [x] **使用场景**
  - 表单 label/input 关联
  - 无障碍属性（aria-*）
  - 列表 key（不推荐）
- [x] **常见问题**：SSR 一致性、vs Math.random()

### 9.3 useDebugValue 💡

> 📄 **详细内容**：[9.3-useDebugValue.md](./Hooks深度解析/9.3-useDebugValue.md)

- [x] **原理讲解**
  - 实现思路：React DevTools 显示调试信息
  - 模拟实现：调试信息注入
- [x] **使用场景**：自定义 Hook 调试
- [x] **延迟格式化**：useDebugValue(value, format)
- [x] **常见问题**：仅在自定义 Hook 中使用
