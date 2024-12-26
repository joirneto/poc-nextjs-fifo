export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Our CRUD App</h1>
      <p className="mb-4">
        Our modern CRUD (Create, Read, Update, Delete) application is designed to provide a seamless and intuitive interface for managing data. Built with the latest web technologies, it offers a responsive design that works great on both desktop and mobile devices.
      </p>
      <p className="mb-4">
        Key features include:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Easy-to-use table management system</li>
        <li>Create new entries with a modal form</li>
        <li>Edit existing entries inline</li>
        <li>Delete entries with confirmation</li>
        <li>Responsive design for all devices</li>
        <li>Light and dark theme support</li>
      </ul>
      <p>
        Whether you're managing a small dataset or a large database, our app provides the tools you need to efficiently handle your data.
      </p>
    </div>
  )
}

