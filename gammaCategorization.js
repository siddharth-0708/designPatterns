/*
Three Gamma Categories:
Design patterns are grouped into three main categories based on their purpose:

A. Creational Patterns → Focus on how objects are created.

B. Structural Patterns → Focus on how objects are arranged and related.

C. Behavioral Patterns → Focus on how objects interact and communicate.

1. Creational Patterns (Object Creation)
These patterns deal with creating objects while hiding the complexities of object instantiation.

Examples:

Singleton → Ensures only one instance of a class exists.
Example: A single database connection for an entire application.

Factory Method → Provides an interface for creating objects without specifying their exact class.
Example: A vehicle factory that creates cars, bikes, or trucks based on user input.

2. Structural Patterns (Object Composition)
These patterns define how objects and classes can be combined to form larger structures.

Examples:

Adapter → Acts as a bridge between two incompatible interfaces.
Example: A charger adapter that lets a European plug fit into a US socket.

Decorator → Adds extra features to an object dynamically without modifying its structure.
Example: Adding extra toppings (cheese, olives) to a pizza.

3. Behavioral Patterns (Object Interaction)
These patterns focus on how objects communicate and share responsibilities.

Examples:

Observer → When one object changes, it automatically notifies multiple dependent objects.
Example: A news website sends updates to all subscribed users.

Strategy → Defines a family of algorithms and allows switching between them dynamically.
Example: Choosing different payment methods (credit card, PayPal, Bitcoin) at checkout.

Summary
Category   ->	Purpose            ->	Example
Creational ->	Object creation    ->	Factory, Singleton
Structural ->	Object composition ->	Adapter, Decorator
Behavioral ->	Object interaction ->	Observer, Strategy

*/