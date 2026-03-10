import java.util.*;

class Resume {
    String name;
    String email;
    String phone;
    String education;
    String skills;
    String projects;
    String experience;

    Resume(String name, String email, String phone, String education,
           String skills, String projects, String experience) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.education = education;
        this.skills = skills;
        this.projects = projects;
        this.experience = experience;
    }

    void displayResume() {
        System.out.println("\n----- STUDENT RESUME -----");
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Phone: " + phone);
        System.out.println("Education: " + education);
        System.out.println("Skills: " + skills);
        System.out.println("Projects: " + projects);
        System.out.println("Experience: " + experience);
        System.out.println("---------------------------");
    }
}

public class StudentResumeMaking {

    static ArrayList<Resume> resumes = new ArrayList<>();

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n===== STUDENT RESUME MAKING SYSTEM =====");
            System.out.println("1. Create Resume");
            System.out.println("2. View All Resumes");
            System.out.println("3. Search Resume by Name");
            System.out.println("4. Delete Resume");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");

            choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    createResume(sc);
                    break;

                case 2:
                    viewResumes();
                    break;

                case 3:
                    searchResume(sc);
                    break;

                case 4:
                    deleteResume(sc);
                    break;

                case 5:
                    System.out.println("Exiting program...");
                    break;

                default:
                    System.out.println("Invalid choice!");
            }

        } while (choice != 5);
    }

    static void createResume(Scanner sc) {

        System.out.print("Enter Name: ");
        String name = sc.nextLine();

        System.out.print("Enter Email: ");
        String email = sc.nextLine();

        System.out.print("Enter Phone: ");
        String phone = sc.nextLine();

        System.out.print("Enter Education: ");
        String education = sc.nextLine();

        System.out.print("Enter Skills: ");
        String skills = sc.nextLine();

        System.out.print("Enter Projects: ");
        String projects = sc.nextLine();

        System.out.print("Enter Experience: ");
        String experience = sc.nextLine();

        Resume r = new Resume(name, email, phone, education, skills, projects, experience);
        resumes.add(r);

        System.out.println("Resume created successfully!");
    }

    static void viewResumes() {

        if (resumes.isEmpty()) {
            System.out.println("No resumes available.");
            return;
        }

        for (Resume r : resumes) {
            r.displayResume();
        }
    }

    static void searchResume(Scanner sc) {

        System.out.print("Enter name to search: ");
        String name = sc.nextLine();

        boolean found = false;

        for (Resume r : resumes) {
            if (r.name.equalsIgnoreCase(name)) {
                r.displayResume();
                found = true;
            }
        }

        if (!found) {
            System.out.println("Resume not found.");
        }
    }

    static void deleteResume(Scanner sc) {

        System.out.print("Enter name to delete resume: ");
        String name = sc.nextLine();

        Iterator<Resume> it = resumes.iterator();

        boolean found = false;

        while (it.hasNext()) {
            Resume r = it.next();
            if (r.name.equalsIgnoreCase(name)) {
                it.remove();
                found = true;
                System.out.println("Resume deleted successfully.");
            }
        }

        if (!found) {
            System.out.println("Resume not found.");
        }
    }
}