export default function Card({ title, desc }) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}
