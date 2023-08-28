class Memory {
  final String id;
  final String title;
  final String description;
  final DateTime eventDate;
  final List<String> tags;
  final String image;
  final DateTime lastReminderSent;

  Memory({
    required this.id,
    required this.title,
    required this.description,
    required this.eventDate,
    required this.tags,
    required this.image,
    required this.lastReminderSent,
  });

  factory Memory.fromJson(Map<String, dynamic> json) {
    return Memory(
      id: json['_id'],
      title: json['title'],
      description: json['description'],
      eventDate: DateTime.parse(json['eventDate']),
      tags: List<String>.from(json['tags']),
      image: json['image'],
      lastReminderSent: DateTime.parse(json['lastReminderSent']),
    );
  }
}
