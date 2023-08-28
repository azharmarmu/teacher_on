import 'dart:convert';
import 'package:http/http.dart' as http;

import '../models/memory.dart';

class ApiService {
  final String baseUrl = 'http://localhost:3000/api/memories'; // Replace with your backend URL

  Future<List<Memory>> fetchMemories() async {
    final response = await http.get(Uri.parse('$baseUrl/list'));
    if (response.statusCode == 200) {
      final List<dynamic> jsonData = json.decode(response.body);
      return jsonData.map((memory) => Memory.fromJson(memory)).toList();
    } else {
      throw Exception('Failed to fetch memories');
    }
  }

  Future<void> addMemory(Memory memory) async {
    final response = await http.post(
      Uri.parse('$baseUrl/add'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'title': memory.title,
        'description': memory.description,
        'eventDate': memory.eventDate.toIso8601String(),
        'tags': memory.tags,
        'image': memory.image,
      }),
    );
    if (response.statusCode != 201) {
      throw Exception('Failed to add memory');
    }
  }
}
