// about modal template
const About = () => {
    // render content
    return (
        <div className="flex flex-col gap-2 h-fit w-full">
            <h3 className="text-center text-base font-bold my-4">
                A Distinctive Platform for Short and Long-Term Property Rentals
            </h3>
            <p className="flex flex-nowrap break-words h-fit w-full">
                OrionRent is an exquisite and sophisticated website built with cutting-edge technologies such as Next.js, React.js, Tailwind, Supabase, clsx, zustand, uniqid, and TypeScript. This distinctive platform is designed to showcase the latest properties available for short and long-term rentals, catering to the discerning individuals seeking premium accommodation options.
                <br />
                <br />
                Upon landing on the OrionRent homepage, users are immediately greeted by a captivating carousel that elegantly displays the six most recently advertised properties. The visually stunning slider further enhances the experience, offering an overview of the 14 latest properties available for rent. The carefully curated grid effortlessly showcases all properties, ensuring that users can effortlessly explore and discover their ideal retreat.
                <br />
                <br />
                As users delve deeper into the website, they are presented with the Property Page – a refined space that leaves no detail untouched. Guests are enticed with a plethora of property information, from an all-encompassing list of amenities and commodities, to comprehensive rate details and captivating descriptions. A stunning picture gallery transports users to their dream destination, captivating them with the essence of the property.
                <br />
                <br />
                The property's rent price is prominently displayed, ensuring complete transparency, and an interactive calendar diligently marks all available and unavailable dates, streamlining the booking process for the discerning guest. The Host Box further exemplifies elegance, featuring the host's phone number, while the 'Chat' button provides a seamless and direct means of communication with the property's host.
                <br />
                <br />
                But the sophistication doesn't end there. OrionRent boasts an Account Settings area, affording users complete control and personalization of their rental journey. The Search Properties section is a refined oasis, allowing users to effortlessly narrow down their search and discover the perfect property that resonates with their desires.
                <br />
                <br />
                For property owners, the Create Advertisement area ensures a seamless and streamlined process to showcase their unique offerings to the world, appealing to an audience that appreciates the finer things in life. Meanwhile, the Messages area serves as a virtual concierge, enabling prompt and efficient communication between guests and hosts.
                <br />
                <br />
                In every aspect, OrionRent showcases elegance, refinement, and attention to detail, elevating the short and long-term rental experience to unparalleled heights. Whether you're a wanderlust seeker yearning for your next adventure or a property owner with a penchant for luxury, OrionRent invites you to experience a world where sophistication meets convenience. Welcome to OrionRent, where every journey becomes an unforgettable masterpiece.
            </p>
            <ul className="flex flex-col gap-2 px-6 my-2 h-fit w-full list-disc">
                <li className="list-item">
                    <strong>Next.js:</strong> Next.js is a powerful React framework that offers server-side rendering (SSR) and static site generation (SSG) capabilities. Its seamless integration with React.js enables fast and efficient development of dynamic web applications. By leveraging Next.js, OrionRent delivers a smooth and performant user experience, making page transitions seamless and reducing loading times.
                </li>
                <li className="list-item">
                    <strong>React.js:</strong> React.js is a popular JavaScript library for building user interfaces. It facilitates the creation of reusable UI components, ensuring code modularity and maintainability. OrionRent's sleek and interactive user interface owes its elegance to React.js, allowing for smooth navigation and intuitive interactions throughout the website.
                </li>
                <li className="list-item">
                    <strong>Tailwind CSS:</strong> Tailwind CSS is a utility-first CSS framework that promotes a utility-based approach to styling. Its extensive collection of pre-defined classes enables rapid prototyping and consistent styling across the entire website. OrionRent's visually appealing and coherent design is made possible by the meticulous use of Tailwind CSS.
                </li>
                <li className="list-item">
                    <strong>Supabase:</strong> Supabase is an open-source backend-as-a-service (BaaS) platform that simplifies backend development. By providing authentication, database management, and API generation out of the box, Supabase significantly reduces development time and complexity. OrionRent's robust backend infrastructure, seamlessly handling user authentication, property data, and other essential functionalities, is powered by Supabase.
                </li>
                <li>
                    <strong>clsx:</strong> clsx is a utility for conditionally joining CSS classes together. It allows developers to create more flexible and dynamic class names for elements based on various conditions. OrionRent skillfully utilizes clsx to create elegant class compositions, enabling responsive layouts and finely-tuned user interactions.
                </li>
                <li className="list-item">
                    <strong>zustand:</strong> Zustand is a minimalistic state management library for React applications. Its lightweight nature and intuitive API make it an excellent choice for maintaining the website's state across different components. OrionRent's seamless data handling and user interactions are orchestrated by Zustand, resulting in a polished and uninterrupted browsing experience.
                </li>
                <li className="list-item">
                    <strong>uniqid:</strong> Uniqid is a simple library used for generating unique IDs, ensuring that each property listing and user interaction is uniquely identified within the system. OrionRent benefits from uniqid by maintaining data integrity and providing smooth navigation through various property pages and listings.
                </li>
                <li className="list-item">
                    <strong>TypeScript:</strong> TypeScript is a strongly-typed superset of JavaScript, providing enhanced code safety and improved developer productivity. OrionRent's codebase is written in TypeScript, reducing the chances of errors and making it easier to maintain and scale the project over time.
                </li>
            </ul>
            <p className="flex flex-nowrap break-words my-2 h-fit w-full">
                By showcasing the use of these state-of-the-art technologies in your portfolio, you highlight your expertise in crafting an elegant, sophisticated, and efficient platform like OrionRent. The combination of Next.js, React.js, Tailwind CSS, Supabase, Axios, clsx, zustand, uniqid, and TypeScript has resulted in a website that epitomizes the perfect blend of form and functionality, offering users a luxurious experience in their quest for short and long-term property rentals.
            </p>
        </div>
    );
}
 
export default About;
