const { Configuration, OpenAIApi } = require('openai');

class AIAssessmentService {
  constructor() {
    this.openai = null;
    this.initializeOpenAI();
  }

  initializeOpenAI() {
    if (process.env.OPENAI_API_KEY) {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.openai = new OpenAIApi(configuration);
    }
  }

  /**
   * Evaluate candidate's AI symbiosis capabilities
   */
  async evaluateAISymbiosis(candidateId, responses) {
    const evaluation = {
      prompt_engineering: 0,
      ai_collaboration: 0,
      critical_thinking: 0,
      tool_adoption: 0,
      ethical_ai_use: 0
    };

    // Evaluate prompt engineering skills
    if (responses.prompt_tasks) {
      evaluation.prompt_engineering = this.evaluatePromptEngineering(responses.prompt_tasks);
    }

    // Evaluate AI collaboration scenarios
    if (responses.collaboration_scenarios) {
      evaluation.ai_collaboration = await this.evaluateCollaborationScenarios(
        responses.collaboration_scenarios
      );
    }

    // Evaluate critical thinking about AI outputs
    if (responses.ai_output_analysis) {
      evaluation.critical_thinking = this.evaluateCriticalThinking(responses.ai_output_analysis);
    }

    // Calculate overall score
    const scores = Object.values(evaluation);
    const overallScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    return {
      overall_score: Math.round(overallScore * 100) / 100,
      breakdown: evaluation,
      ai_readiness_level: this.getAIReadinessLevel(overallScore),
      recommendations: this.generateAITrainingRecommendations(evaluation)
    };
  }

  /**
   * Evaluate prompt engineering skills
   */
  evaluatePromptEngineering(promptTasks) {
    let totalScore = 0;
    const criteria = {
      clarity: 0.3,
      specificity: 0.3,
      context_provision: 0.2,
      output_format_specification: 0.2
    };

    for (const task of promptTasks) {
      let taskScore = 0;
      
      // Check for clarity
      if (task.prompt.length > 20 && task.prompt.split(' ').length > 5) {
        taskScore += criteria.clarity * 100;
      }

      // Check for specificity
      const specificityKeywords = ['specific', 'exactly', 'must', 'should', 'format'];
      const hasSpecificity = specificityKeywords.some(keyword => 
        task.prompt.toLowerCase().includes(keyword)
      );
      if (hasSpecificity) {
        taskScore += criteria.specificity * 100;
      }

      // Check for context provision
      if (task.prompt.includes('context:') || task.prompt.length > 100) {
        taskScore += criteria.context_provision * 100;
      }

      // Check for output format specification
      const formatKeywords = ['list', 'json', 'table', 'steps', 'format'];
      const hasFormat = formatKeywords.some(keyword => 
        task.prompt.toLowerCase().includes(keyword)
      );
      if (hasFormat) {
        taskScore += criteria.output_format_specification * 100;
      }

      totalScore += taskScore;
    }

    return totalScore / promptTasks.length;
  }

  /**
   * Evaluate AI collaboration scenarios
   */
  async evaluateCollaborationScenarios(scenarios) {
    let totalScore = 0;

    for (const scenario of scenarios) {
      let scenarioScore = 0;

      // Evaluate approach to AI collaboration
      if (scenario.approach) {
        if (scenario.approach.includes('verify') || scenario.approach.includes('validate')) {
          scenarioScore += 25;
        }
        if (scenario.approach.includes('iterate') || scenario.approach.includes('refine')) {
          scenarioScore += 25;
        }
        if (scenario.approach.includes('combine') || scenario.approach.includes('human')) {
          scenarioScore += 25;
        }
        if (scenario.approach.includes('ethical') || scenario.approach.includes('responsible')) {
          scenarioScore += 25;
        }
      }

      totalScore += scenarioScore;
    }

    return totalScore / scenarios.length;
  }

  /**
   * Evaluate critical thinking about AI outputs
   */
  evaluateCriticalThinking(analysisResponses) {
    let totalScore = 0;
    
    for (const response of analysisResponses) {
      let responseScore = 0;

      // Check for identification of AI limitations
      if (response.identified_limitations && response.identified_limitations.length > 0) {
        responseScore += 30;
      }

      // Check for validation approach
      if (response.validation_method) {
        responseScore += 30;
      }

      // Check for bias awareness
      if (response.potential_biases && response.potential_biases.length > 0) {
        responseScore += 20;
      }

      // Check for improvement suggestions
      if (response.improvements && response.improvements.length > 0) {
        responseScore += 20;
      }

      totalScore += responseScore;
    }

    return totalScore / analysisResponses.length;
  }

  /**
   * Determine AI readiness level
   */
  getAIReadinessLevel(score) {
    if (score >= 90) return 'expert';
    if (score >= 75) return 'advanced';
    if (score >= 60) return 'intermediate';
    if (score >= 40) return 'beginner';
    return 'novice';
  }

  /**
   * Generate training recommendations based on assessment
   */
  generateAITrainingRecommendations(evaluation) {
    const recommendations = [];

    if (evaluation.prompt_engineering < 70) {
      recommendations.push({
        area: 'Prompt Engineering',
        priority: 'high',
        suggested_training: [
          'Effective prompt design workshop',
          'Context and instruction formatting',
          'Iterative prompt refinement techniques'
        ]
      });
    }

    if (evaluation.ai_collaboration < 70) {
      recommendations.push({
        area: 'AI Collaboration',
        priority: 'high',
        suggested_training: [
          'Human-AI teamwork strategies',
          'AI tool selection and integration',
          'Workflow optimization with AI'
        ]
      });
    }

    if (evaluation.critical_thinking < 70) {
      recommendations.push({
        area: 'Critical AI Analysis',
        priority: 'medium',
        suggested_training: [
          'AI output validation techniques',
          'Bias detection in AI systems',
          'AI limitations and edge cases'
        ]
      });
    }

    if (evaluation.ethical_ai_use < 80) {
      recommendations.push({
        area: 'Ethical AI Usage',
        priority: 'high',
        suggested_training: [
          'Responsible AI practices',
          'Data privacy in AI contexts',
          'Ethical decision-making with AI'
        ]
      });
    }

    return recommendations;
  }

  /**
   * Generate AI-assisted interview questions based on position requirements
   */
  async generateInterviewQuestions(position, candidateProfile) {
    if (!this.openai) {
      return this.getDefaultInterviewQuestions(position);
    }

    try {
      const prompt = `Generate 5 behavioral interview questions for a ${position.title} position 
        at level ${position.hierarchy_level} focusing on:
        - Required AI collaboration level: ${position.ai_collaboration_level}/10
        - Minimum ethical score requirement: ${position.min_ethical_score}
        - Location: ${position.location}
        - Key skills: ${JSON.stringify(position.required_skills)}
        
        Format as JSON array with 'question' and 'evaluation_criteria' fields.`;

      const response = await this.openai.createCompletion({
        model: process.env.AI_MODEL || 'gpt-3.5-turbo',
        prompt,
        max_tokens: 500,
        temperature: 0.7
      });

      return JSON.parse(response.data.choices[0].text);
    } catch (error) {
      console.error('Error generating AI questions:', error);
      return this.getDefaultInterviewQuestions(position);
    }
  }

  /**
   * Default interview questions if AI is unavailable
   */
  getDefaultInterviewQuestions(position) {
    const questions = [
      {
        question: "Describe a time when you used AI tools to solve a complex problem. What was your approach?",
        evaluation_criteria: ["Problem-solving approach", "AI tool selection", "Result validation"]
      },
      {
        question: "How do you ensure ethical considerations when working with AI systems?",
        evaluation_criteria: ["Ethical awareness", "Practical examples", "Responsibility understanding"]
      },
      {
        question: "Tell me about a situation where AI output was incorrect. How did you identify and handle it?",
        evaluation_criteria: ["Critical thinking", "Validation methods", "Problem resolution"]
      }
    ];

    // Add position-specific questions
    if (position.hierarchy_level === 'directive') {
      questions.push({
        question: "How would you lead a team in adopting AI tools while managing resistance to change?",
        evaluation_criteria: ["Leadership approach", "Change management", "Team development"]
      });
    }

    return questions;
  }
}

module.exports = new AIAssessmentService();