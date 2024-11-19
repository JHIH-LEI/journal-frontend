# Project Setup

This project uses GraphQL for data fetching and Tailwind CSS for styling. Follow the steps below to set up and run the project.

## Prerequisites

Make sure you have the following installed:

- Node.js (version 18 or higher)
- pnpm

## Installation

1. Clone the repository:

```bash
git clone git@github.com:JHIH-LEI/journal-frontend.git
```

2. Navigate to the project directory:

```bash
cd <project-directory>
```

3. install dependencies:

```bash
pnpm install
```

## Generate GraphQL Types

To generate GraphQL types for use in your codebase, run:

```bash
pnpm run codegen
```

## Run the Development Server

```bash
pnpm run dev
```

## Tailwind CSS Commands

The project uses Tailwind CSS for styling. You can compile the CSS or enable watch mode using the following commands:

Compile CSS Once
To generate the output.css file:

```bash
pnpm run build:css
```

Enable Watch Mode
To automatically recompile CSS when you make changes:

```bash
pnpm run watch:css
```

Tailwind CSS Configuration
Tailwind is configured via tailwind.config.js and processes styles from the input file located at src/input.css. The compiled CSS is output to src/output.css.
