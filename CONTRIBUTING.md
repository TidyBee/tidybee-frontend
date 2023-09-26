# Contribution Guide - TidyBee

We're delighted that you want to contribute to tidybee-front! Your assistance is invaluable in improving our project and helping it evolve. Before you get started, please read this guide to understand how you can contribute effectively.

## Table of Contents

1. [Report an Issue](#report-an-issue)
2. [GitHub Issue Standard](#github-issue-standard)
3. [Making a Pull Request](#making-a-pull-request)
4. [Git Branches](#git-branches)
5. [Commit Standard](#commit-standard)

## Report an Issue

If you find a bug, a security vulnerability, or have suggestions for improvement, please [open a new issue](https://github.com/TidyBee/tidybee-frontend/issues) using the appropriate issue template. Be sure to follow the issue naming standard described below for better understanding.

## GitHub Issue Standard

### Issue Title

The goal is to progressively define the scope and ownership of the issue within the project. It should be composed in a specific order without omissions:

- The part it belongs to (e.g., backend / frontend)
- Followed by clarification on the specific feature (e.g., MainPage)
- The feature to be implemented by the issue (e.g., navbar)

This gives us a title that progressively describes the feature implemented by the issue, for example: FrontEnd/MainPage/Navbar.

### Issue Body

It's ideal to have a brief description of the issue, why it's proposed, the problem it potentially solves, or its unique advancements and the required resources. You can add H1, H2, H3 headers to divide different parts of the issue if it's complex, although it could be split into multiple issues in turn.

The second part directly addresses the reader, describing the work they need to deliver. What are we talking about, what needs to be done precisely? It should be possible to address your issue without knowing the entirety of the project. In this part, you can add checkboxes to list the things you'd like to see when the issue is completed.

In the final part, you can summarize all the information listed earlier, add code examples to show what you'd like it to look like, and mention the tools used. These messages are placed in quotes and are directly addressed to the developers.

### Issue Metadata

It's important to provide various information about an issue:

- Its association with a milestone.
- Tags that provide a quick understanding of the type of issue (enhancement / fixbug...).

Regarding assignment and the project to which it may be linked, please leave this decision to the project or section manager, who will assign the task and determine whether the issue is complete and can be implemented in the project.

## Making a Pull Request

If you want to contribute code, follow these steps:

1. **Fork** the [Tidybee-front](https://github.com/TidyBee/tidybee-frontend) repository to your own GitHub account.

2. **Clone** your fork locally on your machine:

   ```sh
   git https://github.com/TidyBee/tidybee-frontend.git
   ```

3. **Create a branch** for your contribution following the [Git Branches](#git-branches) guidelines.

4. Make your contribution and add it following the [Commit Standard](#commit-standard).

5. Create a pull request with a description of all the modifications.

## Git Branches

The branch standard is going to be really simple if the exits are properly filled in, since you'll only be asked to click on the create a new branch button directly from the github tool, and everything will be done automatically for you:

[![GitHub Branch Creation](http://docs.tools.tidybee.fr/uploads/images/gallery/2023-06/image-1687109798939.png)](http://docs.tools.tidybee.fr/uploads/images/gallery/2023-06/image-1687109798939.png)

All you have to do is follow github's automatic branch creator tool:

[![GitHub Branch Creation2](http://docs.tools.tidybee.fr/uploads/images/gallery/2023-06/image-1687109891478.png)](http://docs.tools.tidybee.fr/uploads/images/gallery/2023-06/image-1687109891478.png)

## Commit Standard

### Commit Header

Commit title format:

```<feature>(<subfeature, optional>): <Present Tense Verb> + Succinct description of the commit```

Examples:
1. ```docker(webserver): expose port 8080```
2. ```api: add 'filewatch' endpoint```

### Commit Body (optional)

This is where you leave a brief description of the commit to explain the modifications made.

It's needless to say that commits should address one action at a time, and it should be possible to keep versions as clean as possible. You are encouraged to commit as much as possible. A commit that is too extensive or unclear may be rejected.

---

Thank you for contributing to TidyBee!
