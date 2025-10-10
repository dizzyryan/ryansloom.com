#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <ctype.h>

void generatePost(char *title) {
    char filename[150];
    time_t t = time(NULL);
    struct tm tm = *localtime(&t);
    char date[11];
    snprintf(date, sizeof(date), "%04d-%02d-%02d", tm.tm_year + 1900, tm.tm_mon + 1, tm.tm_mday);

    snprintf(filename, sizeof(filename), "%s-%s.md", date, title);
    FILE *file = fopen(filename, "w");
    if (file == NULL) {
        printf("Error creating file.\n");
        return;
    }
    
    fprintf(file,
            "---\n"
            "title: \"%s\"\n"
            "date: %s\n"
            "last_modified_at: %s\n"
            "permalink: /posts/%04d/%02d/%s/\n"
            "excerpt_separator: <!--more-->\n"
            "toc: true\n"
            "tags:\n"
            "  - \n"
            "---\n\n"
            "Your content here.\n",
            title, date, date, tm.tm_year + 1900, tm.tm_mon + 1, title);

    fclose(file);
    printf("Post file '%s' created successfully.\n", filename);
}

void generateCourseReview(char *courseCode) {
    char filename[150];
    time_t t = time(NULL);
    struct tm tm = *localtime(&t);
    char date[11];
    snprintf(date, sizeof(date), "%04d-%02d-%02d", tm.tm_year + 1900, tm.tm_mon + 1, tm.tm_mday);

    for (int i = 0; courseCode[i]; i++) {
        courseCode[i] = toupper(courseCode[i]);
    }

    snprintf(filename, sizeof(filename), "%s-%s.md", date, courseCode);
    FILE *file = fopen(filename, "w");
    if (file == NULL) {
        printf("Error creating file.\n");
        return;
    }
    
    fprintf(file,
            "---\n"
            "title: \"%s Course Review\"\n"
            "date: %s\n"
            "last_modified_at: %s\n"
            "permalink: posts/cuhk-course-review/%04d/%02d/%s/\n"
            "excerpt: \"\"\n"
            "toc: true\n"
            "tags:\n"
            "  - Course Review\n"
            "hidden: true\n"
            "author_profile: false\n"
            "---\n\n"
            "Term Taken: \n\n"
            "Instructor: \n\n"
            "### Grading Scheme\n\n"
            "### Textbook\n\n"
            "### Review\n\n"
            "### Resource\n\n",
            courseCode, date, date, tm.tm_year + 1900, tm.tm_mon + 1, courseCode);

    fclose(file);
    printf("Course review file '%s' created successfully.\n", filename);
}

int main() {
    int choice;
    char input[100];

    printf("Select mode:\n");
    printf("1. Normal Post Mode\n");
    printf("2. Course Review Mode\n");
    printf("Enter your choice (1 or 2): ");
    scanf("%d", &choice);
    getchar();  // Consume newline character

    if (choice == 1) {
        printf("Enter the title of the post: ");
        fgets(input, sizeof(input), stdin);
        input[strcspn(input, "\n")] = 0;  // Remove newline
        generatePost(input);
    } else if (choice == 2) {
        printf("Enter the course code: ");
        fgets(input, sizeof(input), stdin);
        input[strcspn(input, "\n")] = 0;  // Remove newline
        generateCourseReview(input);
    } else {
        printf("Invalid choice.\n");
    }

    return 0;
}