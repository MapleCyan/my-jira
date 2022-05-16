import { useEffect, useState } from "react";

// 使用一个纯函数模拟Test组件
const test = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `现在的num值: ${num}`;
    return function () {
      console.log(message);
    };
  };

  return effect;
};

// 执行test,返回effect函数
const add = test();
// 执行effect，返回引用了 message...1 的unmount函数；unmount被定义的时候，引用message的值为1
const unmount = add();
// 执行effect，返回引用了 message...2 的unmount函数
add();
// 执行effect，返回引用了 message...3 的unmount函数
add();
// 执行effect，返回引用了 message...4 的unmount函数
const unmount2 = add();

unmount(); // 在这里会打印什么？按照直觉似乎应该打印4，实际上打印了1
unmount2(); // 这里打印4

/**
 * NOTE: React Hook 与闭包，Hook 与 闭包经典的坑
 * NOTE: 这里的setInterval输出的num结果一直为0
 * NOTE: 组件卸载时，打印出的num值也为0
 */

export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("num in setInterval: ", num);
    }, 1000);
    return () => clearInterval(interval);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log("卸载时num：", num);
    };
  }, [num]);

  return (
    <div>
      <button onClick={add}>add</button>
      <p>{num}</p>
    </div>
  );
};
