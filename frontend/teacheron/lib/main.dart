import 'package:flutter/material.dart';

import 'models/memory.dart';
import 'services/api_service.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Memories App',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const MemoriesScreen(),
    );
  }
}

class MemoriesScreen extends StatefulWidget {
  const MemoriesScreen({super.key});

  @override
  State<MemoriesScreen> createState() => _MemoriesScreenState();
}

class _MemoriesScreenState extends State<MemoriesScreen> {
  ApiService apiService = ApiService();
  List<Memory> memories = [];

  @override
  void initState() {
    super.initState();
    fetchMemories();
  }

  Future<void> fetchMemories() async {
    final fetchedMemories = await apiService.fetchMemories();
    setState(() {
      memories = fetchedMemories;
    });
  }

  Future<void> addMemory(Memory memory) async {
    await apiService.addMemory(memory);
    fetchMemories();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Memories')),
      body: ListView.builder(
        itemCount: memories.length,
        itemBuilder: (context, index) {
          final memory = memories[index];
          return ListTile(
            title: Text(memory.title),
            subtitle: Text(memory.description),
            onTap: () {},
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          final newMemory = Memory(
            id: '', // Generate a unique ID or leave it empty (backend will generate)
            title: 'New Memory',
            description: '',
            eventDate: DateTime.now(),
            tags: [],
            image: '',
            lastReminderSent: DateTime.now(),
          );
          addMemory(newMemory);
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
