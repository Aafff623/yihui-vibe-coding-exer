import Counter from '../components/Counter'
import Card from '../components/Card'

// 模拟服务端数据获取
async function getData() {
  return { msg: '这条数据来自服务端' }
}

const cardData = [
  { title: 'Java', desc: '后端开发语言' },
  { title: 'React', desc: '前端UI框架' },
  { title: 'Next.js', desc: '全栈React框架' },
]

export default async function Page() {
  const data = await getData()

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Next.js 组件 Demo</h1>

      {/* Demo 1: 服务端数据 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. 服务端组件获取数据</h2>
        <p className="p-4 bg-gray-100 rounded">{data.msg}</p>
      </section>

      {/* Demo 2: 客户端交互组件 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. 客户端组件 (useState + onClick)</h2>
        <Counter />
      </section>

      {/* Demo 3: Props 传参 + 列表渲染 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. Props 传参 + 列表渲染</h2>
        <div className="grid grid-cols-3 gap-4">
          {cardData.map((item, i) => (
            <Card key={i} title={item.title} desc={item.desc} />
          ))}
        </div>
      </section>
    </main>
  )
}
