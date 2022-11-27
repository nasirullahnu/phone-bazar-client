import React from 'react';

const Blog = () => {
    return (
        <div className='mx-5 p-5'>
            <div className='flex justify-center'>
                <h2 className='text mt-6 text-3xl font-semibold'>Commonly Asked Quesctions</h2>
            </div>
            <div className='my-3 border-solid border-2 p-2'>
                <h1 className='font-bold'>
                  1. What are the different ways to manage a state in a React application?
                </h1>
                <p className='mx-5'>
                    There are Four ways to manage a state in React application.
                        <p>1. Local state.</p> 
                        <p>2. Global state.</p> 
                        <p>3. Server state.</p> 
                        <p>4. URL state.</p>
                </p>
            </div>
            <div className='my-3 border-solid border-2 p-2'>
                <h1 className='font-bold'>
                    2. How does prototypical inheritance work?
                </h1>
                <p className='mx-5'>
                The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                </p>
            </div>
            <div className='my-3 border-solid border-2 p-2'>
                <h1 className='font-bold'>
                    3. What is a unit test? Why should we write unit tests?
                </h1>
                <p className='mx-5'>
                The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                </p>
            </div>
            <div className='my-3 border-solid border-2 p-2'>
                <h1 className='font-bold'>
                 4.React vs. Angular vs. Vue?
                </h1>
                <p className='mx-5'>
                    <p>
                        <p className='font-semibold'>React</p>
                        <p>React is better than Angular due to it's virtual DOM implementation and rendering optimizations. Migrating between React's versions is quite easy, too; you don't need to install updates one by one, as in the case of Angular. Finally, with React, developers have myriads of existing solutions they can use.</p>
                    </p>
                    <p>
                        <p className='font-semibold'>Angular</p>
                        <p>React is a UI library, Angular is a fully-fledged front-end framework, while Vue. js is a progressive framework. They can be used almost interchangeably to build front-end applications, but they're not 100 percent the same, so it makes sense to compare them and understand their differences.</p>
                    </p>
                    <p>
                        <p className='font-semibold'>Vue</p>
                        <p>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.</p>
                    </p>
                </p>
            </div>
        </div>
    );
};

export default Blog;