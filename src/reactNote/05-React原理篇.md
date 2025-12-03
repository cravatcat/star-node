# 第五部分：React 原理篇

## 第21章：虚拟 DOM 与 Diff 算法

### 21.1 虚拟 DOM 🌟 [详解](./React原理篇/21.1-虚拟DOM.md)

- [x] **虚拟 DOM 概念**
  - 实现思路：JS 对象表示 DOM 树
  - 数据结构：{type, props, children}
  - 模拟实现：VNode 创建与渲染
- [x] **为什么需要虚拟 DOM**
  - 跨平台：抽象层，可渲染到不同平台
  - 性能优化：批量更新、减少 DOM 操作
  - 开发体验：声明式编程
- [x] **虚拟 DOM 创建**
  - createElement：创建 VNode
  - render：VNode → 真实 DOM
- [x] **常见问题**：虚拟 DOM 不一定更快、优势在于可维护性

### 21.2 Diff 算法 🌟 [详解](./React原理篇/21.2-Diff算法.md)

- [x] **Diff 算法策略**
  - 同层比较：不跨层级对比
  - 类型比较：type 不同直接替换
  - key 优化：快速定位节点
- [x] **单节点 Diff**
  - 实现思路：对比 type 和 key
  - 模拟实现：单节点对比逻辑
  - 场景：单个子节点更新
- [x] **多节点 Diff**
  - 实现思路：React 使用双指针 + key 映射
  - 模拟实现：列表 Diff
  - 步骤：
    1. 第一轮：处理更新节点
    2. 第二轮：处理新增节点
    3. 第三轮：处理删除节点
- [x] **key 的作用**
  - 实现思路：通过 key 识别节点，避免错误复用
  - 为什么不用 index：顺序变化导致错误复用
  - 模拟实现：基于 key 的优化
- [x] **常见问题**：Diff 三大策略、key 的重要性、时间复杂度 O(n)

### 21.3 Fiber 架构 🌟 [详解](./React原理篇/21.3-Fiber架构.md)

- [x] **Fiber 是什么**
  - 实现思路：可中断的递归，链表结构
  - 数据结构：child、sibling、return 指针
  - 解决问题：长任务阻塞渲染
- [x] **Fiber 节点结构**

  ```javascript
  {
    type: 'div',
    props: {},
    child: Fiber,      // 第一个子节点
    sibling: Fiber,    // 下一个兄弟节点
    return: Fiber,     // 父节点
    alternate: Fiber,  // 对应的另一棵树
    effectTag: 'UPDATE',
    stateNode: DOMNode
  }
  ```

- [x] **Fiber 工作原理**
  - 实现思路：双缓冲技术（current tree + workInProgress tree）
  - 模拟实现：简易 Fiber 调度
  - 工作流程：
    1. render 阶段：构建 workInProgress 树
    2. commit 阶段：切换 current 指针
- [x] **时间切片**
  - 实现思路：requestIdleCallback / MessageChannel
  - 模拟实现：任务调度器（5ms 工作单元）
  - shouldYield：判断是否需要中断
- [x] **优先级调度**
  - 实现思路：Lane 模型（31 位二进制）
  - 优先级：Immediate > UserBlocking > Normal > Low > Idle
  - 模拟实现：优先级队列
- [x] **常见问题**：Fiber 解决了什么问题、双缓冲、时间切片

---

## 第22章：渲染流程

### 22.1 首次渲染 🌟 [详解](./React原理篇/22.1-首次渲染.md)

- [x] **render 阶段（可中断）**
  - beginWork：向下遍历，创建子 Fiber
  - completeWork：向上归并，创建 DOM
  - 模拟实现：递归构建 Fiber 树
- [x] **commit 阶段（不可中断）**
  - before mutation：执行 getSnapshotBeforeUpdate
  - mutation：提交 DOM 变更
  - layout：执行 useLayoutEffect
  - 模拟实现：commitWork
- [x] **常见问题**：两阶段设计、为什么 commit 不可中断

### 22.2 更新流程 🌟 [详解](./React原理篇/22.2-更新流程.md)

- [x] **触发更新**
  - setState：类组件更新
  - useState：函数组件更新
  - forceUpdate：强制更新
  - props 变化：父组件传入
- [x] **调度更新**
  - 实现思路：批量更新、优先级调度
  - 模拟实现：更新队列
  - React 18 自动批处理：所有更新都批处理
- [x] **协调阶段（Reconciliation）**
  - 实现思路：Diff + 打标记（Placement、Update、Deletion）
  - 模拟实现：reconciliation
  - effectTag：标记副作用类型
- [x] **常见问题**：批量更新原理、React 18 变化

### 22.3 并发渲染 🌟 [详解](./React原理篇/22.3-并发渲染.md)

- [x] **Concurrent Mode**
  - 实现思路：可中断渲染、时间切片
  - 模拟实现：时间切片渲染
  - 特性：
    - 可中断：高优先级任务插队
    - 可恢复：从中断点继续
    - 可复用：复用已完成的工作
- [x] **Suspense 原理**
  - 实现思路：捕获 Promise、显示 fallback
  - 模拟实现：Suspense 机制
  - 工作流程：
    1. 组件抛出 Promise
    2. Suspense 捕获并显示 fallback
    3. Promise 完成后重新渲染
- [x] **Transitions**
  - 实现思路：标记低优先级更新
  - useTransition：包裹更新逻辑
  - useDeferredValue：延迟值更新
- [x] **常见问题**：并发模式优势、Suspense 工作原理

---

## 第23章：Hooks 原理

### 23.1 Hooks 数据结构 🌟 [详解](./React原理篇/23.1-Hooks数据结构.md)

- [x] **Hook 链表**
  - 实现思路：单向链表存储（memoizedState）
  - 数据结构：

    ```javascript
    {
      memoizedState: any,  // 当前状态
      next: Hook,          // 下一个 Hook
      queue: UpdateQueue,  // 更新队列
    }
    ```

  - 模拟实现：Hook 链表管理
- [x] **Fiber 与 Hooks 关系**
  - fiber.memoizedState：指向第一个 Hook
  - 链表顺序：决定 Hook 调用顺序
- [x] **常见问题**：为什么 Hook 必须按顺序调用

### 23.2 Hooks 执行流程 🌟 [详解](./React原理篇/23.2-Hooks执行流程.md)

- [x] **mount 阶段**
  - 实现思路：初始化 Hook（mountState、mountEffect）
  - 模拟实现：

    ```javascript
    function mountState(initialState) {
      const hook = mountWorkInProgressHook();
      hook.memoizedState = initialState;
      const queue = { pending: null };
      hook.queue = queue;
      
      const dispatch = dispatchAction.bind(null, currentFiber, queue);
      return [hook.memoizedState, dispatch];
    }
    ```

- [x] **update 阶段**
  - 实现思路：更新 Hook（updateState、updateEffect）
  - 模拟实现：

    ```javascript
    function updateState() {
      const hook = updateWorkInProgressHook();
      const queue = hook.queue;
      
      // 处理更新队列
      let newState = hook.memoizedState;
      const pending = queue.pending;
      if (pending) {
        // 计算新状态
        newState = applyUpdates(newState, pending);
      }
      
      hook.memoizedState = newState;
      return [newState, dispatch];
    }
    ```

- [x] **常见问题**：mount vs update、更新队列处理

### 23.3 Hooks 规则原理 🌟 [详解](./React原理篇/23.3-Hooks规则原理.md)

- [x] **为什么不能在条件语句中使用**
  - 实现思路：链表顺序依赖，条件语句破坏顺序
  - 图解说明：

    ```
    第一次渲染：Hook1 → Hook2 → Hook3
    第二次渲染（if false）：Hook1 → Hook3
    // Hook3 会错误地读取 Hook2 的状态
    ```

- [x] **为什么只能在函数组件中使用**
  - 实现思路：依赖 Fiber 架构的 memoizedState
  - 类组件：使用 this.state
  - 函数组件：使用 Hooks
- [x] **常见问题**：Hooks 规则背后的原理

---

## 第24章：事件系统

### 24.1 合成事件 🌟 [详解](./React原理篇/24.1-合成事件.md)

- [x] **合成事件原理**
  - 实现思路：事件委托 + 包装原生事件
  - 模拟实现：SyntheticEvent
  - 优势：
    - 跨浏览器兼容
    - 事件池优化（React 17 前）
    - 统一管理
- [x] **事件池（React 17 前）**
  - 实现思路：对象复用，减少 GC
  - 注意：异步访问需要 event.persist()
  - React 17+：移除事件池
- [x] **常见问题**：合成事件 vs 原生事件、React 17 变化

### 24.2 事件委托 🌟 [详解](./React原理篇/24.2-事件委托.md)

- [x] **事件委托机制**
  - React 16：委托到 document
  - React 17+：委托到 root 节点
  - 实现思路：根节点统一监听，通过 target 分发
  - 模拟实现：事件委托系统
- [x] **事件冒泡与捕获**
  - 实现思路：模拟 DOM 事件流
  - 模拟实现：事件传播
  - 阻止冒泡：e.stopPropagation()
- [x] **React 17+ 事件变化**
  - 挂载到 root 而非 document
  - 移除事件池
  - 与原生事件的交互更好
- [x] **常见问题**：事件委托优势、React 17 变化原因

---

## 第25章：调度器（Scheduler）

### 25.1 调度原理 🌟 [详解](./React原理篇/25.1-调度原理.md)

- [x] **任务优先级**
  - 实现思路：Lane 模型（31 位二进制）
  - 优先级定义：

    ```javascript
    ImmediatePriority = 1
    UserBlockingPriority = 2
    NormalPriority = 3
    LowPriority = 4
    IdlePriority = 5
    ```

  - 模拟实现：优先级队列
- [x] **时间切片**
  - 实现思路：5ms 工作单元
  - shouldYield：判断是否超时
  - 模拟实现：

    ```javascript
    function workLoop(deadline) {
      while (nextUnitOfWork && !shouldYield()) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      }
      
      if (nextUnitOfWork) {
        requestIdleCallback(workLoop);
      }
    }
    ```

- [x] **任务调度**
  - 实现思路：最小堆 + 过期时间
  - 模拟实现：任务队列管理
- [x] **常见问题**：优先级调度、时间切片原理

### 25.2 调度流程 🌟 [详解](./React原理篇/25.2-调度流程.md)

- [x] **scheduleCallback**
  - 实现思路：添加任务到队列
  - 模拟实现：调度入口

  ```javascript
  function scheduleCallback(priorityLevel, callback) {
    const currentTime = getCurrentTime();
    const timeout = timeoutForPriority(priorityLevel);
    const expirationTime = currentTime + timeout;
    
    const newTask = {
      callback,
      priorityLevel,
      expirationTime,
      sortIndex: expirationTime,
    };
    
    push(taskQueue, newTask);
    requestHostCallback(flushWork);
  }
  ```

- [x] **workLoop**
  - 实现思路：循环执行任务
  - 模拟实现：工作循环

  ```javascript
  function workLoop(hasTimeRemaining, initialTime) {
    let currentTask = peek(taskQueue);
    
    while (currentTask !== null) {
      if (currentTask.expirationTime > initialTime && 
          (!hasTimeRemaining || shouldYieldToHost())) {
        break; // 时间片用完，中断
      }
      
      const callback = currentTask.callback;
      if (typeof callback === 'function') {
        currentTask.callback = null;
        const didUserCallbackTimeout = 
          currentTask.expirationTime <= initialTime;
        const continuationCallback = 
          callback(didUserCallbackTimeout);
        
        if (typeof continuationCallback === 'function') {
          currentTask.callback = continuationCallback;
        } else {
          pop(taskQueue);
        }
      }
      
      currentTask = peek(taskQueue);
    }
  }
  ```

- [x] **常见问题**：任务调度流程、可中断恢复

---

## 第26章：性能优化原理

### 26.1 渲染优化 🌟 [详解](./React原理篇/26.1-渲染优化.md)

- [x] **bailout 策略**
  - 实现思路：跳过不必要的渲染
  - 条件：
    - props 没变化（浅比较）
    - state 没变化
    - context 没变化
  - React.memo：手动控制
- [x] **shouldComponentUpdate**
  - 类组件优化
  - PureComponent：自动浅比较
- [x] **常见问题**：React 如何判断是否需要重渲染

### 26.2 代码分割 ⭐ [详解](./React原理篇/26.2-代码分割.md)

- [x] **React.lazy 原理**
  - 实现思路：动态 import() + Suspense
  - 模拟实现：懒加载组件
- [x] **路由级代码分割**
  - 按路由拆分 bundle
  - 首屏优化
- [x] **常见问题**：代码分割策略

### 26.3 列表优化 ⭐ [详解](./React原理篇/26.3-列表优化.md)

- [x] **虚拟列表**
  - 实现思路：只渲染可见区域
  - 模拟实现：react-window 原理
- [x] **key 优化**
  - 稳定的 key
  - 避免使用 index
- [x] **常见问题**：大列表优化方案
